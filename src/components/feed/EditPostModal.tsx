import { useState, useRef } from 'react';
import type { PostFeedItem } from '../../features/posts/postTypes';
import { useUpdatePostMutation } from '../../features/posts/postsApi';
import Modal from '../shared/Modal';
import Avatar from '../shared/Avatar';
import toast from 'react-hot-toast';

interface EditPostModalProps {
  post: PostFeedItem;
  onClose: () => void;
}

const EditPostModal = ({ post, onClose }: EditPostModalProps) => {
  const [updatePost, { isLoading }] = useUpdatePostMutation();
  const [content, setContent] = useState(post.content);
  const [visibility, setVisibility] = useState<'PUBLIC' | 'PRIVATE'>(post.visibility);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(post.imageUrl ?? null);
  const [removeExistingImage, setRemoveExistingImage] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setRemoveExistingImage(false);
    }
  };

  const removeImage = () => {
    setImage(null);
    if (imagePreview && image) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    setRemoveExistingImage(true);
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleSubmit = async () => {
    const trimmed = content.trim();
    if (!trimmed) return;
    try {
      const formData = new FormData();
      formData.append('content', trimmed);
      formData.append('visibility', visibility);
      if (image) {
        formData.append('image', image);
      }
      await updatePost({ postId: post.id, formData }).unwrap();
      toast.success('Post updated!');
      onClose();
    } catch {
      toast.error('Failed to update post');
    }
  };

  const hasChanges =
    content.trim() !== post.content ||
    visibility !== post.visibility ||
    image !== null ||
    removeExistingImage;

  return (
    <Modal isOpen onClose={onClose} title="Edit Post">
      <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
        <Avatar user={post.author} size={36} />
        <div>
          <p style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>{post.author.firstName} {post.author.lastName}</p>
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value as 'PUBLIC' | 'PRIVATE')}
            style={{ padding: '2px 6px', borderRadius: 4, border: '1px solid #ddd', fontSize: 12, marginTop: 4 }}
          >
            <option value="PUBLIC">Public</option>
            <option value="PRIVATE">Private</option>
          </select>
        </div>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        maxLength={5000}
        style={{ width: '100%', border: '1px solid #ddd', borderRadius: 8, padding: 10, fontSize: 14, resize: 'vertical', boxSizing: 'border-box' }}
      />

      {imagePreview && (
        <div style={{ position: 'relative', margin: '10px 0', display: 'inline-block' }}>
          <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8, objectFit: 'cover' }} />
          <button
            type="button"
            onClick={removeImage}
            style={{ position: 'absolute', top: -6, right: -6, background: '#ff4757', color: '#fff', border: 'none', borderRadius: '50%', width: 22, height: 22, cursor: 'pointer', fontSize: 14, lineHeight: 1 }}
          >
            &times;
          </button>
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          style={{ background: 'none', border: '1px solid #ddd', borderRadius: 6, padding: '6px 12px', cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 20 20">
            <path fill="#666" d="M13.916 0c3.109 0 5.18 2.429 5.18 5.914v8.17c0 3.486-2.072 5.916-5.18 5.916H5.999C2.89 20 .827 17.572.827 14.085v-8.17C.827 2.43 2.897 0 6 0h7.917zm0 1.504H5.999c-2.321 0-3.799 1.735-3.799 4.41v8.17c0 2.68 1.472 4.412 3.799 4.412h7.917c2.328 0 3.807-1.734 3.807-4.411v-8.17c0-2.678-1.478-4.411-3.807-4.411zm.65 8.68l.12.125 1.9 2.147a.803.803 0 01-.016 1.063.642.642 0 01-.894.058l-.076-.074-1.9-2.148a.806.806 0 00-1.205-.028l-.074.087-2.04 2.717c-.722.963-2.02 1.066-2.86.26l-.111-.116-.814-.91a.562.562 0 00-.793-.07l-.075.073-1.4 1.617a.645.645 0 01-.97.029.805.805 0 01-.09-.977l.064-.086 1.4-1.617c.736-.852 1.95-.897 2.734-.137l.114.12.81.905a.587.587 0 00.861.033l.07-.078 2.04-2.718c.81-1.08 2.27-1.19 3.205-.275zM6.831 4.64c1.265 0 2.292 1.125 2.292 2.51 0 1.386-1.027 2.511-2.292 2.511S4.54 8.537 4.54 7.152c0-1.386 1.026-2.51 2.291-2.51zm0 1.504c-.507 0-.918.451-.918 1.007 0 .555.411 1.006.918 1.006.507 0 .919-.451.919-1.006 0-.556-.412-1.007-.919-1.007z" />
          </svg>
          Photo
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16, paddingTop: 12, borderTop: '1px solid #eee' }}>
        <button
          type="button"
          onClick={onClose}
          style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: 14 }}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading || !content.trim() || !hasChanges}
          style={{
            padding: '8px 16px',
            borderRadius: 6,
            border: 'none',
            background: hasChanges && content.trim() ? '#377DFF' : '#ccc',
            color: '#fff',
            cursor: hasChanges && content.trim() ? 'pointer' : 'not-allowed',
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </Modal>
  );
};

export default EditPostModal;
