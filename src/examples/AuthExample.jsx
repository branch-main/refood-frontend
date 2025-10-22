import { useState } from 'react';
import { useAuth } from '../hooks';
import { USER_TYPES } from '../utils';

/**
 * Example component demonstrating authentication
 */
function AuthExample() {
  const { user, isAuthenticated, login, register, logout } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);

  if (isAuthenticated && user) {
    return <UserProfile user={user} onLogout={logout} />;
  }

  return (
    <div className="auth-container">
      <h1>{isLoginMode ? 'Login' : 'Register'}</h1>
      
      {isLoginMode ? (
        <LoginForm onLogin={login} />
      ) : (
        <RegisterForm onRegister={register} />
      )}

      <button onClick={() => setIsLoginMode(!isLoginMode)}>
        {isLoginMode ? 'Need an account? Register' : 'Have an account? Login'}
      </button>
    </div>
  );
}

/**
 * Login form component
 */
function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await onLogin(username, password);
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

/**
 * Registration form component
 */
function RegisterForm({ onRegister }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    user_type: USER_TYPES.CONSUMER,
    first_name: '',
    last_name: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await onRegister(formData);
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      
      <select
        name="user_type"
        value={formData.user_type}
        onChange={handleChange}
        required
      >
        <option value={USER_TYPES.CONSUMER}>Consumer</option>
        <option value={USER_TYPES.RESTAURANT}>Restaurant</option>
        <option value={USER_TYPES.NGO}>NGO</option>
      </select>
      
      <input
        type="text"
        name="first_name"
        placeholder="First Name"
        value={formData.first_name}
        onChange={handleChange}
      />
      
      <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        value={formData.last_name}
        onChange={handleChange}
      />
      
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
      />
      
      <button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
}

/**
 * User profile component
 */
function UserProfile({ user, onLogout }) {
  return (
    <div className="user-profile">
      <h2>Welcome, {user.username}!</h2>
      <p>Email: {user.email}</p>
      <p>User Type: {user.user_type}</p>
      <p>Member since: {new Date(user.created_at).toLocaleDateString()}</p>
      
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default AuthExample;
