import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { blogService } from '../services/blogService';
import { serviceApi } from '../services/serviceService';
import { contactService } from '../services/contactService';
import { clientService } from '../services/clientService';
import { careerService } from '../services/careerService';
import { jobService } from '../services/jobService';
import { getConfig, updateConfig } from '../services/configService';
import api from '../lib/api';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage';
import { FileText, Layers, MessageSquare, LogOut, Plus, Trash2, Edit, Image, Upload, X, Users, ZoomIn, ZoomOut, Briefcase, FilePlus, Eye } from 'lucide-react';
import DocumentPreviewModal from '../components/DocumentPreviewModal';
import ReplyModal from '../components/ReplyModal';
import Meta from '../components/Meta';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('blogs');
  const [data, setData] = useState({
    blogs: [],
    services: [],
    contacts: [],
    clients: [],
    applications: [],
    jobs: []
  });
  const [loading, setLoading] = useState(true);
  const [headerImages, setHeaderImages] = useState([]);
  const [aboutImage, setAboutImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  
  // Cropping State
  const [isCropping, setIsCropping] = useState(false);
  const [croppingImage, setCroppingImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [cropType, setCropType] = useState(null); // 'header', 'about', or 'client'
  const [aspectRatio, setAspectRatio] = useState(16 / 9);

  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [uploading, setUploading] = useState(false);

  // Document Preview State
  const [previewDoc, setPreviewDoc] = useState(null);

  // Reply Modal State
  const [replyModal, setReplyModal] = useState({
    isOpen: false,
    recipientEmail: '',
    id: null,
    type: null, // 'contact' or 'application'
    initialSubject: '',
    initialMessage: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadData();
  }, [user]);

  const loadData = async () => {
    try {
      const [
        blogsRes, 
        servicesRes, 
        contactsRes, 
        clientsRes, 
        applicationsRes,
        jobsRes,
        headerConfig, 
        aboutConfig
      ] = await Promise.all([
        blogService.getAll(),
        serviceApi.getAll(),
        contactService.getAll(),
        clientService.getAll(),
        careerService.getApplications(),
        jobService.getAll(),
        getConfig('headerImages'),
        getConfig('aboutImage')
      ]);

      setData({
        blogs: blogsRes.data.blogs || [],
        services: servicesRes.data || [],
        contacts: contactsRes.data || [],
        clients: clientsRes.data || [],
        applications: applicationsRes.data || [],
        jobs: jobsRes.data || []
      });

      if (headerConfig && Array.isArray(headerConfig.value)) {
        setHeaderImages(headerConfig.value);
      } else {
        // Fallback to check for old bannerImage and migrate if needed
        const oldConfig = await getConfig('bannerImage');
        if (oldConfig && oldConfig.value) {
          setHeaderImages([oldConfig.value]);
        }
      }
      
      if (aboutConfig && aboutConfig.value) {
        setAboutImage(aboutConfig.value);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      if (error.response?.status === 401) {
        logout();
        navigate('/login');
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      if (activeTab === 'blogs') {
        await blogService.delete(id);
      } else if (activeTab === 'services') {
        await serviceApi.delete(id);
      } else if (activeTab === 'clients') {
        await clientService.delete(id);
      } else if (activeTab === 'jobs') {
        await jobService.delete(id);
      }
      loadData();
    } catch (error) {
      alert('Error deleting item');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (activeTab === 'blogs') {
        if (editingItem) {
          await blogService.update(editingItem._id, formData);
        } else {
          await blogService.create(formData);
        }
      } else if (activeTab === 'services') {
        const serviceData = {
          ...formData,
          features: formData.featuresText 
            ? formData.featuresText.split('\n').filter(f => f.trim()) 
            : []
        };
        delete serviceData.featuresText;

        if (editingItem) {
          await serviceApi.update(editingItem._id, serviceData);
        } else {
          await serviceApi.create(serviceData);
        }
      } else if (activeTab === 'clients') {
        if (editingItem) {
          await clientService.create(formData);
        } else {
          await clientService.create(formData);
        }
      } else if (activeTab === 'jobs') {
        if (editingItem) {
          await jobService.update(editingItem._id, formData);
        } else {
          await jobService.create(formData);
        }
      }
      setShowModal(false);
      setEditingItem(null);
      setFormData({});
      loadData();
    } catch (error) {
      alert('Error saving item');
    }
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const initiateCrop = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setCroppingImage(reader.result);
      setCropType(type);
      setAspectRatio(type === 'client' ? 1 : 16 / 9);
      setIsCropping(true);
      setZoom(1);
      setCrop({ x: 0, y: 0 });
    });
    reader.readAsDataURL(file);
    // Reset file input
    e.target.value = null;
  };

  const handleCropSave = async () => {
    try {
      setUploading(true);
      const croppedImageBlob = await getCroppedImg(croppingImage, croppedAreaPixels);
      
      const uploadData = new FormData();
      uploadData.append('image', croppedImageBlob, 'cropped-image.jpg');

      const response = await api.post('/upload', uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (cropType === 'header') {
        setHeaderImages([...headerImages, response.data.url]);
      } else if (cropType === 'about') {
        setAboutImage(response.data.url);
      } else if (cropType === 'client') {
        setFormData(prev => ({ ...prev, logo: response.data.url }));
      } else if (cropType === 'blog') {
        setFormData(prev => ({ ...prev, image: response.data.url }));
      }

      // Reset crop state
      setIsCropping(false);
      setCroppingImage(null);
      setCropType(null);
    } catch (error) {
      console.error('Error uploading cropped image:', error);
      alert('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    const newImages = headerImages.filter((_, i) => i !== index);
    setHeaderImages(newImages);
  };

  const handleSettingsUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateConfig('headerImages', headerImages);
      await updateConfig('aboutImage', aboutImage);
      alert('Settings updated successfully');
    } catch (error) {
      alert('Error updating settings');
    }
  };

  const handleEdit = (item) => {
    const itemWithFeatures = {
      ...item,
      featuresText: item.features ? item.features.join('\n') : ''
    };
    setEditingItem(itemWithFeatures);
    setFormData(itemWithFeatures);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    if (activeTab === 'blogs') {
      setFormData({ title: '', description: '', content: '', author: '', image: '' });
    } else if (activeTab === 'services') {
      setFormData({ name: '', description: '', icon: 'Globe', featuresText: '' });
    } else if (activeTab === 'clients') {
      setFormData({ name: '', logo: '' });
    }
    setShowModal(true);
  };

  const sendReply = async ({ email, subject, message }) => {
    try {
      if (replyModal.type === 'contact') {
        await contactService.reply({ 
            id: replyModal.id, 
            email, 
            subject, 
            message 
        });
      } else if (replyModal.type === 'application') {
        await careerService.reply({ 
            id: replyModal.id, 
            email, 
            subject, 
            message 
        });
      }
      
      alert('Reply sent successfully');
      setReplyModal(prev => ({ ...prev, isOpen: false }));
    } catch (error) {
      console.error('Error sending reply:', error);
      alert('Failed to send reply');
    }
  };

  const handleReply = (item, type) => {
    let initialMessage = '';
    let initialSubject = '';

    if (type === 'contact') {
      initialSubject = `Re: ${item.subject || 'Your Inquiry'}`;
      initialMessage = `Dear ${item.name}, 
 
 Thank you for reaching out to Donvikopc Solutions. 
 
 We have received your message and appreciate your interest in our organization. Our team will review your details, and we’ll get back to you shortly if your profile matches our current requirements. 
 
 In the meantime, feel free to explore more about our company or reach out if you have any additional questions. 
 
 Thank you once again for your interest. 
 
 Best regards, 
 
 HR Team 
 
 Donvikopc Solutions 
 
 +91 8978190675 
 
 info@donvik.com`;
    } else if (type === 'application') {
      initialSubject = `Update on your application for ${item.position}`;
      initialMessage = `Dear ${item.name}, 
 
 Thank you for applying for the position of ${item.position} at Donvikopc Solutions. 
 
 We have successfully received your resume and our recruitment team is currently reviewing your profile. If your qualifications match our requirements, we will contact you for the next steps in the hiring process. 
 
 We appreciate your interest in joining Donvikopc Solutions and wish you all the best. 
 
 Warm regards, 
 
 HR Team 
 
 Donvikopc Solutions 
 
 +91 8978190675 
 
 info@donvik.com`;
    }

    setReplyModal({
      isOpen: true,
      recipientEmail: item.email,
      id: item._id,
      type,
      initialSubject,
      initialMessage
    });
  };

  const tabs = [
    { id: 'blogs', icon: FileText, label: 'Blogs', count: data.blogs.length },
    { id: 'services', icon: Layers, label: 'Services', count: data.services.length },
    { id: 'clients', icon: Users, label: 'Clients', count: data.clients.length },
    { id: 'applications', icon: Briefcase, label: 'Applications', count: data.applications.length },
    { id: 'jobs', icon: FilePlus, label: 'Manage Jobs', count: data.jobs.length },
    { id: 'contacts', icon: MessageSquare, label: 'Messages', count: data.contacts.length },
    { id: 'settings', icon: Image, label: 'Settings', count: 0 },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-gray-50">
      <Meta 
        title="Admin Dashboard" 
        description="Manage content, services, and inquiries for Donvik Private Limited." 
      />
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold gradient-text">Admin Dashboard</h1>
          <button onClick={logout} className="flex items-center gap-2 text-gray-600 hover:text-red-500">
            <LogOut size={20} />
            Logout
          </button>
        </div>

        <div className="flex gap-4 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'gradient-bg text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                {tab.label}
                {tab.count > 0 && (
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-white/20 text-sm">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold capitalize">{activeTab}</h2>
              {(activeTab === 'blogs' || activeTab === 'services' || activeTab === 'clients') && (
                <button
                  onClick={handleAdd}
                  className="flex items-center gap-2 px-4 py-2 gradient-bg text-white rounded-lg"
                >
                  <Plus size={20} />
                  Add New
                </button>
              )}
            </div>
  
          {activeTab === 'applications' ? (
              <div className="space-y-4">
                {data.applications.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No applications yet</p>
                ) : (
                  data.applications.map((app) => (
                    <div key={app._id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-bold text-lg">{app.name}</h3>
                            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full font-medium border border-purple-200">
                              Applied for: {app.position}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                            <span>{app.email}</span>
                            <span>•</span>
                            <span>{app.phone}</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium uppercase ${
                            app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            app.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                            app.status === 'contacted' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {app.status}
                          </span>
                          <button 
                            onClick={() => setPreviewDoc({ url: app.resumeUrl, title: `${app.name}'s Resume` })}
                            className="flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm transition-colors"
                          >
                            <Eye size={14} /> View Resume
                          </button>
                          <button 
                            onClick={() => handleReply(app, 'application')}
                            className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20 rounded text-sm transition-colors"
                          >
                            <MessageSquare size={14} /> Reply
                          </button>
                        </div>
                      </div>
                      {app.message && (
                        <div className="mt-3 bg-gray-50 p-3 rounded text-sm">
                          <p className="font-semibold mb-1">Cover Letter/Message:</p>
                          <p>{app.message}</p>
                        </div>
                      )}
                      <p className="text-xs text-gray-400 mt-2">
                        Applied: {new Date(app.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            ) : activeTab === 'contacts' ? (
              <div className="space-y-4">
                {data.contacts.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No messages yet</p>
                ) : (
                  data.contacts.map((contact) => (
                    <div key={contact._id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold">{contact.subject}</h3>
                          <p className="text-sm text-gray-600">
                            {contact.name} • {contact.email}
                            {contact.phone && ` • ${contact.phone}`}
                          </p>
                        </div>
                        <button 
                          onClick={() => handleReply(contact, 'contact')}
                          className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20 rounded text-sm transition-colors"
                        >
                          <MessageSquare size={14} /> Reply
                        </button>
                      </div>
                      <p className="mt-2">{contact.message}</p>
                    </div>
                  ))
                )}
              </div>
        ) : activeTab === 'jobs' ? (
          <div className="space-y-4">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => handleAdd('jobs')}
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
              >
                <Plus size={20} /> Add Job
              </button>
            </div>
            {data.jobs.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No job postings yet</p>
            ) : (
              <div className="grid gap-4">
                {data.jobs.map((job) => (
                  <div key={job._id} className="border rounded-lg p-4 flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{job.title}</h3>
                      <div className="flex flex-wrap gap-2 text-sm text-gray-600 mt-2">
                        <span className="bg-gray-100 px-2 py-1 rounded">{job.department}</span>
                        <span className="bg-gray-100 px-2 py-1 rounded">{job.location}</span>
                        <span className="bg-gray-100 px-2 py-1 rounded">{job.type}</span>
                        <span className="bg-gray-100 px-2 py-1 rounded">{job.experience} Exp</span>
                        <span className={`px-2 py-1 rounded font-medium ${job.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {job.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(item => ({
                          ...item,
                          _id: job._id,
                          title: job.title,
                          description: job.description,
                          department: job.department,
                          location: job.location,
                          type: job.type,
                          experience: job.experience,
                          status: job.status
                        }))}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : activeTab === 'settings' ? (
              <div className="max-w-2xl">
                <form onSubmit={handleSettingsUpdate} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-4">Header Images</label>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {headerImages.map((url, index) => (
                        <div key={index} className="relative group aspect-video rounded-lg overflow-hidden border">
                          <img src={url} alt={`Header ${index + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors">
                      <input
                        type="file"
                        id="imageUpload"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => initiateCrop(e, 'header')}
                        disabled={uploading}
                      />
                      <label htmlFor="imageUpload" className="cursor-pointer flex flex-col items-center">
                        <Upload size={32} className="text-gray-400 mb-2" />
                        <span className="text-gray-600">
                          {uploading ? 'Uploading...' : 'Click to upload new image'}
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-4">About Page "Our Story" Image</label>
                    {aboutImage && (
                      <div className="relative group aspect-video rounded-lg overflow-hidden border mb-4">
                        <img src={aboutImage} alt="About Story" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setAboutImage('')}
                          className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors">
                      <input
                        type="file"
                        id="aboutImageUpload"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => initiateCrop(e, 'about')}
                        disabled={uploading}
                      />
                      <label htmlFor="aboutImageUpload" className="cursor-pointer flex flex-col items-center">
                        <Upload size={32} className="text-gray-400 mb-2" />
                        <span className="text-gray-600">
                          {uploading ? 'Uploading...' : 'Click to upload new image'}
                        </span>
                      </label>
                    </div>
                  </div>

                  <button type="submit" className="gradient-bg text-white px-6 py-3 rounded-lg font-medium">
                    Save Changes
                  </button>
                </form>
              </div>
            ) : activeTab === 'clients' ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data.clients.length === 0 ? (
                  <p className="text-gray-500 text-center py-8 col-span-full">No clients yet</p>
                ) : (
                  data.clients.map((client) => (
                    <div key={client._id} className="border rounded-lg p-4 relative group">
                      <div className="aspect-video bg-gray-100 rounded mb-2 flex items-center justify-center p-2">
                        <img src={client.logo} alt={client.name} className="max-w-full max-h-full object-contain" />
                      </div>
                      <h3 className="font-bold text-center truncate">{client.name}</h3>
                      <button
                        onClick={() => handleDelete(client._id)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {(activeTab === 'blogs' ? data.blogs : data.services).length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No items yet</p>
                ) : (
                  (activeTab === 'blogs' ? data.blogs : data.services).map((item) => (
                    <div key={item._id} className="flex justify-between items-center border rounded-lg p-4">
                      <div className="flex items-center gap-4">
                        {activeTab === 'blogs' && item.image && (
                          <div className="w-16 h-16 flex-shrink-0">
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                        )}
                        <div>
                          <h3 className="font-bold">{item.title || item.name}</h3>
                          <p className="text-sm text-gray-600 truncate max-w-md">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(item)} className="p-2 hover:bg-gray-100 rounded-lg">
                          <Edit size={20} className="text-blue-500" />
                        </button>
                        <button onClick={() => handleDelete(item._id)} className="p-2 hover:bg-gray-100 rounded-lg">
                          <Trash2 size={20} className="text-red-500" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
  
          {isCropping && (
        <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-[60] p-4">
          <div className="relative w-full max-w-5xl h-[80vh] bg-black rounded-lg overflow-hidden mb-6 border border-gray-800">
            <Cropper
              image={croppingImage}
              crop={crop}
              zoom={zoom}
              aspect={aspectRatio}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div className="w-full max-w-2xl space-y-4">
             <div className="flex justify-center gap-4 mb-2">
               <button 
                 onClick={() => setAspectRatio(16/9)} 
                 className={`px-3 py-1 rounded text-sm ${aspectRatio === 16/9 ? 'bg-white text-black' : 'bg-gray-700 text-white'}`}
               >
                 16:9
               </button>
               <button 
                 onClick={() => setAspectRatio(4/3)} 
                 className={`px-3 py-1 rounded text-sm ${aspectRatio === 4/3 ? 'bg-white text-black' : 'bg-gray-700 text-white'}`}
               >
                 4:3
               </button>
               <button 
                 onClick={() => setAspectRatio(1)} 
                 className={`px-3 py-1 rounded text-sm ${aspectRatio === 1 ? 'bg-white text-black' : 'bg-gray-700 text-white'}`}
               >
                 1:1
               </button>
             </div>
             <div className="flex items-center gap-4 text-white">
               <ZoomOut size={20} />
               <input
                 type="range"
                 value={zoom}
                 min={1}
                 max={3}
                 step={0.1}
                 aria-labelledby="Zoom"
                 onChange={(e) => setZoom(Number(e.target.value))}
                 className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
               />
               <ZoomIn size={20} />
             </div>
             <div className="flex gap-4">
               <button
                 onClick={() => {
                   setIsCropping(false);
                   setCroppingImage(null);
                 }}
                 className="flex-1 bg-white/20 text-white py-3 rounded-lg hover:bg-white/30 transition-colors"
               >
                 Cancel
               </button>
               <button
                 onClick={handleCropSave}
                 disabled={uploading}
                 className="flex-1 gradient-bg text-white py-3 rounded-lg font-medium"
               >
                 {uploading ? 'Uploading...' : 'Crop & Upload'}
               </button>
             </div>
          </div>
        </div>
      )}

      {previewDoc && (
        <DocumentPreviewModal
          isOpen={!!previewDoc}
          onClose={() => setPreviewDoc(null)}
          documentUrl={previewDoc.url}
          title={previewDoc.title}
        />
      )}

      <ReplyModal
        isOpen={replyModal.isOpen}
        onClose={() => setReplyModal(prev => ({ ...prev, isOpen: false }))}
        recipientEmail={replyModal.recipientEmail}
        onSend={sendReply}
        title={replyModal.type === 'application' ? 'Reply to Applicant' : 'Reply to Message'}
      />

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              {editingItem ? 'Edit' : 'Add'} {activeTab.slice(0, -1)}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {activeTab === 'blogs' ? (
                <>
                  <input
                    type="text"
                    placeholder="Title"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border"
                    required
                  />
                  <textarea
                    placeholder="Content (HTML supported)"
                    value={formData.content || ''}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border h-32"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Author"
                    value={formData.author || ''}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border"
                    required
                  />
                  <label className="block border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                    {formData.image && (
                      <div className="mb-4 aspect-video bg-gray-100 rounded flex items-center justify-center p-2 h-32 mx-auto">
                        <img src={formData.image} alt="Preview" className="max-w-full max-h-full object-contain" />
                      </div>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => initiateCrop(e, 'blog')}
                    />
                    <span className="text-blue-600 font-medium">
                      {formData.image ? 'Click to change image' : 'Click to upload image'}
                    </span>
                  </label>
                </>
              ) : activeTab === 'clients' ? (
                <>
                  <input
                    type="text"
                    placeholder="Client Name"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border"
                    required
                  />
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors">
                    {formData.logo && (
                      <div className="mb-4 aspect-video bg-gray-100 rounded flex items-center justify-center p-2 h-32 mx-auto">
                        <img src={formData.logo} alt="Preview" className="max-w-full max-h-full object-contain" />
                      </div>
                    )}
                    <input
                      type="file"
                      id="clientLogoUpload"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => initiateCrop(e, 'client')}
                    />
                    <label htmlFor="clientLogoUpload" className="cursor-pointer block">
                      <span className="text-blue-600 font-medium">Click to upload logo</span>
                    </label>
                  </div>
                </>
              ) : activeTab === 'jobs' ? (
                <>
                  <input
                    type="text"
                    placeholder="Job Title"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Department"
                      value={formData.department || ''}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={formData.location || ''}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <select
                      value={formData.type || 'Full-time'}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                      <option value="Remote">Remote</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Experience (e.g. 2 years)"
                      value={formData.experience || ''}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border"
                      required
                    />
                  </div>
                  <select
                    value={formData.status || 'Open'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border"
                  >
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                  </select>
                  <textarea
                    placeholder="Job Description & Responsibilities"
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border h-48"
                    required
                  />
                </>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Service Name"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border"
                    required
                  />
                  <textarea
                    placeholder="Description"
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border h-32"
                    required
                  />
                  <textarea
                    placeholder="Features (one per line)"
                    value={formData.featuresText || ''}
                    onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border h-32"
                  />
                  <select
                    value={formData.icon || 'Globe'}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border"
                  >
                    <option value="Code">Code</option>
                    <option value="Database">Database</option>
                    <option value="Smartphone">Mobile</option>
                    <option value="Globe">Web</option>
                    <option value="Shield">Security</option>
                    <option value="Zap">Performance</option>
                  </select>
                </>
              )}
              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-1 gradient-bg text-white py-3 rounded-lg">
                  {editingItem ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setEditingItem(null); }}
                  className="flex-1 bg-gray-200 py-3 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
