import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './ContentManagement.css';

const ContentManagement = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
        try {
            const response = await api.get('/creator/posts', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log('Post ricevuti:', response.data);
            setPosts(response.data);
        } catch (error) {
            console.error('Errore nel recupero dei post:', error);
        }
    };
    fetchPosts();
  }, []);

  const toggleCommentsVisibility = async (postId) => {
    try {
      await api.patch(`/creator/posts/${postId}/toggle-comments`);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, comments_enabled: !post.comments_enabled } : post
        )
      );
      alert('Visibilità dei commenti aggiornata!');
    } catch (error) {
      console.error('Errore durante l\'aggiornamento della visibilità dei commenti:', error);
    }
  };

  return (
    <div className="content-management">
      <h1>Gestione Contenuti</h1>
      <section className="content-list">
  {posts.length > 0 ? (
    posts.map((post) => (
      <div key={post.id} className="content-card">
        <h3>{post.title}</h3>
        <p>{post.description}</p>
        {post.type.startsWith('image/') ? (
          <img src={`/storage/${post.file_path}`} alt={post.title} />
        ) : (
          <video controls>
            <source src={`/storage/${post.file_path}`} type={post.type} />
          </video>
        )}
        <div className="content-actions">
          <button onClick={() => toggleCommentsVisibility(post.id)}>
            {post.comments_enabled ? 'Disabilita Commenti' : 'Abilita Commenti'}
          </button>
        </div>
        <div className="content-comments">
          <h4>Commenti</h4>
          {post.comments_enabled ? (
            post.comments.length > 0 ? (
              post.comments.map((comment) => (
                <p key={comment.id}>{comment.comment}</p>
              ))
            ) : (
              <p>Nessun commento disponibile.</p>
            )
          ) : (
            <p>I commenti sono disabilitati per questo post.</p>
          )}
        </div>
      </div>
    ))
  ) : (
    <p>Non hai ancora post creati.</p>
  )}
</section>

    </div>
  );
};

export default ContentManagement;
