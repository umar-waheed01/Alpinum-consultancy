import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import TopHeader from '../Components/TopHeader';

const CompanyProfile = () => {
    const route = useRoute();
    const { companyId } = route.params;
    console.log("companyProfile++",companyId)

  const token = useSelector((state) => state.auth.token);
  const [isLoading, setIsLoading] = useState(false);
  const [companyProfile, setCompanyProfile] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token && companyId) {
      fetchCompanyProfile();
    }
  }, [token, companyId]);

  const fetchCompanyProfile = async () => {
  setIsLoading(true);
  try {
    const resp = await fetch(
      `https://alpinum-consulting.vercel.app/api/company/company-profile/${companyId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const result = await resp.json();
    console.log("result++++",result)
    setCompanyProfile(result.companyProfile);
    setUser(result.user);
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Failed to fetch company profile',
      text2: error.message,
    });
  } finally {
    setIsLoading(false);
  }
};

  return (
    <>
      <TopHeader />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Company Profile</Text>

        {isLoading ? (
          <ActivityIndicator size="large" color="#f47920" />
        ) : companyProfile ? (
          <View style={styles.card}>
            <Image
              source={{
                uri:
                  companyProfile.logoUrl ||
                  'https://via.placeholder.com/120?text=No+Logo',
              }}
              style={styles.logo}
            />
            <Text style={styles.companyName}>{companyProfile.companyName}</Text>
            {companyProfile.location && (
              <Text style={styles.location}>{companyProfile.location}</Text>
            )}

            <View style={styles.infoBox}>
              <LabelValue label="Email" value={user?.email} />
              <LabelValue
                label="Joining Date"
                value={new Date(companyProfile.createdAt).toLocaleDateString()}
              />
              <LabelValue label="Company Size" value={companyProfile.companySize} />
              <LabelValue label="Founded Year" value={companyProfile.foundedYear} />
              <LabelValue label="Website" value={companyProfile.website} />
              <LabelValue label="Industry" value={companyProfile.industry} />
              <LabelValue label="Description" value={companyProfile.description} />
            </View>
          </View>
        ) : (
          <Text>No company profile found.</Text>
        )}
      </ScrollView>
    </>
  );
};

const LabelValue = ({ label, value }) => {
  if (!value) return null;
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export default CompanyProfile;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fdfdfd',
    padding: 16,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 12,
  },
  companyName: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  location: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 12,
  },
  infoBox: {
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    gap:10
  },
  label: {
    fontWeight: '600',
    color: '#333',
  },
  value: {
    flex: 1,
    color: '#555',
  },
});
