import { useState, useEffect } from 'react';

function FetchGetPost() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
      const controller = new AbortController();

      async function fetchData() {
          setIsLoading(true);
          setError(null);
          try {
              const res = await fetch('https://api.example.com/items', {signal: controller.signal});
              if (!res.ok) throw new Error('Failed to fetch');
              const json = await res.json();
              setData(json);
          } catch (err) {
              if (err.name !== 'AbortError') {
                  setError(err.message);
              }
          } finally {
              setIsLoading(false);
          }
      }

      fetchData();
      return () => controller.abort(); // Clean up on unmount or dependency change
  }, []);
}

export default function CreateUserForm() {
    // 1. Form Inputs State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    // 2. Local List State
    const [userList, setUserList] = useState([]);

    // 3. Request Lifecycle State
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Helper to read an uploaded file as a Base64 image string
    const handleImageUpload = e => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result); // Base64 data string
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();

        setIsLoading(true);
        setError(null);

        const newUserPayload = {
            name,
            email,
            // Fallback image if none selected
            avatar: imageUrl || 'https://via.placeholder.com/80',
        };

        try {
            // POST Request
            const response = await fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUserPayload),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const createdUser = await response.json();

            // 4. Update the user list locally (prepend the new user)
            setUserList(prev => [
                {
                    ...createdUser,
                    // Guarantee avatar and a unique key for local list rendering
                    avatar: newUserPayload.avatar,
                    id: createdUser.id || Date.now(),
                },
                ...prev,
            ]);

            // Reset Form Inputs
            setName('');
            setEmail('');
            setImageUrl('');
            e.target.reset(); // Resets file input
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{maxWidth: '500px', margin: '20px auto', fontFamily: 'sans-serif'}}>
            <h2>Create New User</h2>

            <form onSubmit={handleSubmit} style={{borderBottom: '2px solid #ccc', paddingBottom: '20px'}}>
                <div style={{marginBottom: '10px'}}>
                    <label style={{display: 'block', fontWeight: 'bold'}}>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        disabled={isLoading}
                        style={{width: '100%', padding: '8px', boxSizing: 'border-box'}}
                    />
                </div>

                <div style={{marginBottom: '10px'}}>
                    <label style={{display: 'block', fontWeight: 'bold'}}>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                        style={{width: '100%', padding: '8px', boxSizing: 'border-box'}}
                    />
                </div>

                <div style={{marginBottom: '10px'}}>
                    <label style={{display: 'block', fontWeight: 'bold'}}>Profile Image:</label>
                    <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isLoading} />

                    {/* Image Preview */}
                    {imageUrl && (
                        <div style={{marginTop: '8px'}}>
                            <img
                                src={imageUrl}
                                alt="Preview"
                                style={{width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover'}}
                            />
                        </div>
                    )}
                </div>

                <button type="submit" disabled={isLoading} style={{padding: '8px 16px', cursor: 'pointer'}}>
                    {isLoading ? 'Creating...' : 'Add User'}
                </button>
            </form>

            {/* Error Feedback */}
            {error && (
                <div style={{color: 'red', marginTop: '15px'}}>
                    <strong>Error:</strong> {error}
                </div>
            )}

            {/* 5. User List Display */}
            <div style={{marginTop: '20px'}}>
                <h3>User List ({userList.length})</h3>

                {userList.length === 0 ? (
                    <p style={{color: '#666'}}>No users added yet.</p>
                ) : (
                    <ul style={{listStyle: 'none', padding: 0}}>
                        {userList.map(user => (
                            <li
                                key={user.id}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '15px',
                                    padding: '10px',
                                    marginBottom: '10px',
                                    border: '1px solid #ddd',
                                    borderRadius: '6px',
                                }}
                            >
                                {/* Image Rendering */}
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        backgroundColor: '#eee',
                                    }}
                                />

                                {/* Details */}
                                <div>
                                    <strong style={{display: 'block'}}>{user.name}</strong>
                                    <span style={{color: '#555', fontSize: '14px'}}>{user.email}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
