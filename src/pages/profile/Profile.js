import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../contexts/AuthContext';
import ProfileService from '../../services/profileService/ProfileService'; 
const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
`;

const ProfileTitle = styled.h1`
  font-size: 2.5rem;
  color: #343a40;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const ProfileDetail = styled.div`
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
`;

const DetailLabel = styled.span`
  font-weight: bold;
  color: #495057;
`;


const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await ProfileService.getProfile();
        setProfile(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Erreur lors de la récupération des informations de profil', error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <p>Chargement des informations...</p>;
  }

  return (
    <ProfileContainer>
      <ProfileTitle>Mon Profil</ProfileTitle>
      <ProfileDetail>
        <DetailLabel>Prénom: </DetailLabel> {profile.firstName}
      </ProfileDetail>
      <ProfileDetail>
        <DetailLabel>Nom: </DetailLabel> {profile.lastName}
      </ProfileDetail>
      <ProfileDetail>
        <DetailLabel>Email: </DetailLabel> {profile.email}
      </ProfileDetail>
      <ProfileDetail>
        <DetailLabel>Rôles: </DetailLabel> {profile.roles.join(', ')}
      </ProfileDetail>
    </ProfileContainer>
  );
};

export default Profile;
