import { useState, useEffect } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FiPlus, FiSave, FiEye, FiMove, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';
import { toast } from 'react-toastify';

// Sortable Item Component
const SortableItem = ({ id, component, onDelete, onUpdate }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const handleChange = (key, value) => {
        const currentData = component.data || {};
        onUpdate(id, { ...currentData, [key]: value });
    };

    return (
        <div ref={setNodeRef} style={style} className="bg-zinc-900 p-4 rounded-lg shadow-sm border border-gray-800 mb-3">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                    <div {...attributes} {...listeners} className="cursor-move p-2 text-gray-500 hover:text-white">
                        <FiMove />
                    </div>
                    <span className="ml-2 font-medium text-white capitalize badge bg-gray-800 px-2 py-1 rounded text-xs">
                        {component.type}
                    </span>
                </div>
                <button onClick={() => onDelete(id)} className="text-red-500 hover:text-red-400 p-2">
                    <FiTrash2 />
                </button>
            </div>

            <div className="space-y-3 pl-4">
                {/* Dynamic Inputs based on type */}
                {(component.type === 'link' || component.type === 'social') && (
                    <>
                        <input
                            type="text"
                            value={component.data?.label || ''}
                            onChange={(e) => handleChange('label', e.target.value)}
                            placeholder="Label (e.g. My Website)"
                            className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-sm text-white focus:border-primary outline-none"
                        />
                        <input
                            type="text"
                            value={component.data?.url || ''}
                            onChange={(e) => handleChange('url', e.target.value)}
                            placeholder="URL (https://...)"
                            className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-sm text-white focus:border-primary outline-none"
                        />
                    </>
                )}
                {component.type === 'text' && (
                    <textarea
                        value={component.data?.text || ''}
                        onChange={(e) => handleChange('text', e.target.value)}
                        placeholder="Enter your text..."
                        className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-sm text-white focus:border-primary outline-none"
                        rows="3"
                    />
                )}
                {component.type === 'video' && (
                    <input
                        type="text"
                        value={component.data?.url || ''}
                        onChange={(e) => handleChange('url', e.target.value)}
                        placeholder="YouTube/Vimeo URL"
                        className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-sm text-white focus:border-primary outline-none"
                    />
                )}
                {component.type === 'gallery' && (
                    <div className="space-y-2">
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => {
                                const files = Array.from(e.target.files);
                                Promise.all(files.map(file => {
                                    return new Promise((resolve) => {
                                        const reader = new FileReader();
                                        reader.onloadend = () => resolve(reader.result);
                                        reader.readAsDataURL(file);
                                    });
                                })).then(images => {
                                    const currentImages = component.data?.images || [];
                                    handleChange('images', [...currentImages, ...images]);
                                });
                            }}
                            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-800 file:text-white hover:file:bg-gray-700"
                        />
                        <p className="text-xs text-gray-500">Pick images from your device</p>

                        {/* Existing Text Area for Manual URLs fallback */}
                        <textarea
                            value={(component.data?.images || []).join('\n')}
                            onChange={(e) => handleChange('images', e.target.value.split('\n'))}
                            placeholder="Or paste Image URLs (one per line)"
                            className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-sm text-white focus:border-primary outline-none"
                            rows="2"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

const ProfileEdit = () => {
    const [profile, setProfile] = useState(null);
    const [components, setComponents] = useState([]);
    const [loading, setLoading] = useState(true);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            // For MVP, just get the first profile or create one
            const { data: profiles } = await api.get('/profiles');
            if (profiles.length > 0) {
                setProfile(profiles[0]);
                setComponents(profiles[0].components || []);
            } else {
                // Create default profile if none exists
                // simplified flow
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setComponents((items) => {
                const oldIndex = items.findIndex((i) => i._id === active.id);
                const newIndex = items.findIndex((i) => i._id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const addComponent = (type) => {
        let defaultData = {};
        switch (type) {
            case 'link':
            case 'social':
                defaultData = { label: 'New Link', url: 'https://' };
                break;
            case 'text':
                defaultData = { text: 'Enter text here' };
                break;
            case 'video':
                defaultData = { url: 'https://youtube.com/...' };
                break;
            case 'gallery':
                defaultData = { images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'] };
                break;
            default:
                defaultData = { label: 'Item' };
        }

        const newComponent = {
            _id: `temp-${Date.now()}`,
            type,
            data: defaultData,
            isEnabled: true
        };
        setComponents([...components, newComponent]);
    };

    const removeComponent = (id) => {
        setComponents(components.filter(c => c._id !== id));
    };

    const handleSave = async () => {
        if (!profile) return;
        try {
            // Prepare payload: remove _id, createdAt, updatedAt, __v, and userId
            const { _id, userId, createdAt, updatedAt, __v, ...updateData } = profile;
            // Also, we need to ensure local component _id's are filtered out if they cause issues, 
            // but since schema has _id: false, mongoose might just drop them. 
            // However, let's be safe and map them.
            const sanitizedComponents = components.map(({ _id, ...rest }) => rest);

            await api.put(`/profiles/${profile._id}`, { ...updateData, components: sanitizedComponents });
            toast.success('Profile saved successfully');
        } catch (error) {
            toast.error('Failed to save profile');
        }
    };

    const handleUpdateComponent = (id, newData) => {
        setComponents(components.map(c => c._id === id ? { ...c, data: newData } : c));
    };

    const handleImageUpload = (e, field) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile({ ...profile, [field]: reader.result }); // Store as Base64 for MVP
            };
            reader.readAsDataURL(file);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] overflow-hidden">
            {/* Editor Sidebar */}
            <div className="w-full lg:w-1/2 p-4 lg:p-6 overflow-y-auto border-r border-gray-800 scrollbar-thin scrollbar-thumb-gray-700 h-full">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl lg:text-2xl font-bold text-white">Profile Editor</h2>
                    <button onClick={handleSave} className="flex items-center px-4 py-2 bg-primary text-black font-bold rounded-md hover:bg-opacity-90 transition-colors text-sm lg:text-base">
                        <FiSave className="mr-2" /> Save
                    </button>
                </div>

                {/* ... (rest of the content remains the same, just wrapper classes changed) ... */}

                {/* Basic Info */}
                <div className="mb-8 p-4 bg-zinc-900 rounded-lg border border-gray-800">
                    <h3 className="text-lg font-medium text-white mb-4">Basic Information</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Profile Picture</label>
                            <div className="flex items-center space-x-4">
                                {profile?.avatarUrl && <img src={profile.avatarUrl} alt="Avatar" className="w-12 h-12 rounded-full object-cover border border-gray-700" />}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, 'avatarUrl')}
                                    className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-800 file:text-white hover:file:bg-gray-700"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Cover Image</label>
                            <div className="flex items-center space-x-4">
                                {profile?.coverUrl && <img src={profile.coverUrl} alt="Cover" className="w-12 h-12 rounded object-cover border border-gray-700" />}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, 'coverUrl')}
                                    className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-800 file:text-white hover:file:bg-gray-700"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Display Name</label>
                                <input
                                    type="text"
                                    value={profile?.displayName || ''}
                                    onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                                    className="w-full bg-black border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:border-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Job Title</label>
                                <input
                                    type="text"
                                    value={profile?.title || ''}
                                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                                    className="w-full bg-black border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:border-primary"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Company</label>
                            <input
                                type="text"
                                value={profile?.company || ''}
                                onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                                className="w-full bg-black border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Bio</label>
                            <textarea
                                value={profile?.bio || ''}
                                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                rows="3"
                                className="w-full bg-black border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:border-primary"
                            />
                        </div>
                    </div>
                </div>

                {/* Theme Settings */}
                <div className="mb-8 p-4 bg-zinc-900 rounded-lg border border-gray-800">
                    <h3 className="text-lg font-medium text-white mb-4">Appearance</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Layout</label>
                            <select
                                value={profile?.theme?.layout || 'classic'}
                                onChange={(e) => setProfile({ ...profile, theme: { ...profile.theme, layout: e.target.value } })}
                                className="w-full bg-black border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:border-primary"
                            >
                                <option value="classic">Classic</option>
                                <option value="modern">Modern</option>
                                <option value="minimal">Minimal</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Accent Color</label>
                            <div className="flex space-x-2">
                                {['#c6ff00', '#3b82f6', '#ec4899', '#8b5cf6', '#ef4444'].map(color => (
                                    <button
                                        key={color}
                                        onClick={() => setProfile({ ...profile, theme: { ...profile.theme, primaryColor: color } })}
                                        className={`w-8 h-8 rounded-full border-2 ${profile?.theme?.primaryColor === color ? 'border-white' : 'border-transparent'}`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Components List */}
                <div className="mb-6">
                    <h3 className="text-lg font-medium text-white mb-4">Content Blocks</h3>
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={components.map(c => c._id)} strategy={verticalListSortingStrategy}>
                            {components.map((component) => (
                                <SortableItem
                                    key={component._id}
                                    id={component._id}
                                    component={component}
                                    onDelete={removeComponent}
                                    onUpdate={handleUpdateComponent}
                                />
                            ))}
                        </SortableContext>
                    </DndContext>
                    {components.length === 0 && <p className="text-gray-500 italic">No components added yet.</p>}
                </div>

                {/* Add Component Buttons */}
                <div className="grid grid-cols-2 gap-4">
                    {['link', 'social', 'text', 'video', 'gallery'].map(type => (
                        <button
                            key={type}
                            onClick={() => addComponent(type)}
                            className="flex items-center justify-center p-3 border border-gray-700 rounded-md hover:bg-gray-800 bg-zinc-900 text-white capitalize"
                        >
                            <FiPlus className="mr-2" /> Add {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Live Preview - Hidden on mobile, block on lg */}
            <div className="hidden lg:flex w-1/2 bg-gray-100 items-center justify-center p-8">
                <div className="w-[375px] h-[667px] bg-white rounded-[3rem] border-8 border-gray-900 shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-secondary rounded-b-xl z-10"></div>
                    <div className="h-full overflow-y-auto hide-scrollbar">
                        {/* Simulated Mobile View */}
                        <div className="h-40 bg-gradient-to-r from-indigo-500 to-purple-500 relative">
                            {profile?.coverUrl && <img src={profile.coverUrl} className="w-full h-full object-cover" alt="Cover" />}
                        </div>
                        <div className="px-6 -mt-12 text-center relative z-10">
                            <div className="w-24 h-24 rounded-full bg-white mx-auto border-4 border-white shadow-md overflow-hidden">
                                {profile?.avatarUrl ? (
                                    <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                                        <span className="text-2xl">?</span>
                                    </div>
                                )}
                            </div>
                            <h3 className="mt-4 text-xl font-bold text-gray-900">{profile?.displayName || 'My Name'}</h3>
                            <p className="text-gray-600 font-medium">{profile?.title || 'Job Title'}</p>
                            {profile?.company && <p className="text-gray-500 text-sm mt-1">{profile.company}</p>}
                            {profile?.bio && <p className="text-gray-700 mt-4 text-sm">{profile.bio}</p>}

                            <div className="mt-6 space-y-3">
                                {components.map(comp => (
                                    <div key={comp._id} className="p-3 bg-zinc-900 rounded-lg border border-gray-800 text-white">
                                        <span className="text-xs text-gray-400 uppercase font-bold block mb-1">{comp.type}</span>
                                        {comp.data?.label && <div>{comp.data.label}</div>}
                                        {comp.data?.text && <div className="truncate text-sm text-gray-300">{comp.data.text}</div>}
                                        {comp.data?.url && <div className="truncate text-sm text-blue-400">{comp.data.url}</div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileEdit;
