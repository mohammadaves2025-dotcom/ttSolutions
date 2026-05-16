import React, { useState } from 'react';
import { api } from '../services/api';

const ImageUpload = ({ onUpload, existingImage, label = "Upload Image" }) => {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(existingImage || '');
    const [error, setError] = useState('');

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Basic validation
        if (!file.type.startsWith('image/')) {
            setError('Please select an image file.');
            return;
        }

        setError('');
        setUploading(true);

        const formData = new FormData();
        formData.append('image', file);

        try {
            // Use the centralized api service
            const data = await api.uploadImage(formData);

            if (data.success) {
                setPreview(data.imageUrl);
                onUpload(data.imageUrl); // Pass URL back to parent
            } else {
                setError(data.message || 'Upload failed');
            }
        } catch (err) {
            console.error('Upload error:', err);
            setError(err.message || 'Network error during upload');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="image-upload-container">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>{label}</label>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                <div style={{ flex: '1' }}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={uploading}
                        style={{ padding: '10px 0' }}
                    />
                    {uploading && <p style={{ color: '#666', fontSize: '0.9em' }}>Uploading...</p>}
                    {error && <p style={{ color: 'red', fontSize: '0.9em' }}>{error}</p>}
                </div>

                {preview && (
                    <div style={{
                        width: '100px',
                        height: '100px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f9f9f9'
                    }}>
                        <img
                            src={preview}
                            alt="Preview"
                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                            onError={(e) => e.target.style.display = 'none'}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;
