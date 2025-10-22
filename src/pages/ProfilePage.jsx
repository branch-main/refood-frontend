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
          <h1>Mi Perfil</h1>
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
                <span className="info-label">Usuario:</span>
                <span className="info-value">{user.username}</span>
              </div>

              <div className="info-row">
                <span className="info-label">Correo:</span>
                <span className="info-value">{user.email}</span>
              </div>

              <div className="info-row">
                <span className="info-label">Tipo de Cuenta:</span>
                <span className="info-value">
                  <span className="user-type-badge">{user.user_type}</span>
                </span>
              </div>

              {user.first_name && (
                <div className="info-row">
                  <span className="info-label">Nombre:</span>
                  <span className="info-value">
                    {user.first_name} {user.last_name}
                  </span>
                </div>
              )}

              {user.phone && (
                <div className="info-row">
                  <span className="info-label">Teléfono:</span>
                  <span className="info-value">{user.phone}</span>
                </div>
              )}

              <div className="info-row">
                <span className="info-label">Miembro Desde:</span>
                <span className="info-value">{formatDate(user.created_at)}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
