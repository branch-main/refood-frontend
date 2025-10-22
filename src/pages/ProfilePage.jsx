import { useAuthContext } from '../contexts/AuthContext';
import { Card } from '../components/common';
import { formatDate } from '../utils';
import './ProfilePage.css';

export const ProfilePage = () => {
  const { user } = useAuthContext();

  if (!user) return null;

  return (
    <div className="profile-page">
      <div className="container-small">
        <div className="page-header">
          <h1>My Profile</h1>
        </div>

        <Card>
          <div className="profile-content">
            <div className="profile-avatar">
              <div className="avatar-circle">
                {user.username.charAt(0).toUpperCase()}
              </div>
            </div>

            <div className="profile-info">
              <div className="info-row">
                <span className="info-label">Username:</span>
                <span className="info-value">{user.username}</span>
              </div>

              <div className="info-row">
                <span className="info-label">Email:</span>
                <span className="info-value">{user.email}</span>
              </div>

              <div className="info-row">
                <span className="info-label">Account Type:</span>
                <span className="info-value">
                  <span className="user-type-badge">{user.user_type}</span>
                </span>
              </div>

              {user.first_name && (
                <div className="info-row">
                  <span className="info-label">Name:</span>
                  <span className="info-value">
                    {user.first_name} {user.last_name}
                  </span>
                </div>
              )}

              {user.phone && (
                <div className="info-row">
                  <span className="info-label">Phone:</span>
                  <span className="info-value">{user.phone}</span>
                </div>
              )}

              <div className="info-row">
                <span className="info-label">Member Since:</span>
                <span className="info-value">{formatDate(user.created_at)}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
