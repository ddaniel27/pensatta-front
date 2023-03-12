import '../../../styles/profileCard.css'
export default function ProfileCard ({ username = 'Cuenta Demo', institution_code = 'Institución', imgSrc = './images/Katty-Retrato.svg' }) {
  return (
    <div className="profile-card">
      <img src={imgSrc} alt="profile-img" />
      <div className="profile-card-info">
        <div className="profile-card-info-name">{username}</div>
        <div className="profile-card-info-info">
          <div className="profile-card-info-institution-code">{institution_code}</div>
        </div>
      </div>
    </div>
  )
}
