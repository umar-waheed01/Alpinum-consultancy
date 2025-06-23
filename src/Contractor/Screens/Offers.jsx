import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  StyleSheet,
  Platform 
} from 'react-native';
import { useSelector } from 'react-redux';
import SignatureModal from '../../Components/SignatureModal';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import TopHeader from '../../Components/TopHeader';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';

const Offers = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const signedBy = `${user?.firstName || ''} ${user?.lastName || ''}`;

  const navigation = useNavigation();
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [signatureModalVisible, setSignatureModalVisible] = useState(false);
  const [selectedContractId, setSelectedContractId] = useState(null);

  useEffect(() => {
    if (token) fetchOffers();
  }, [token]);

  const fetchOffers = async () => {
    setIsLoading(true);
    try {
      const resp = await fetch('https://alpinum-consulting.vercel.app/api/offers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await resp.json();
      if (!resp.ok) throw new Error(result.error);
      setOffers(result.offers || []);
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Error fetching offers', text2: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewCompany = (companyId) => {
  navigation.navigate('CompanyProfile', { companyId });
};

  const handleDownload = async (url) => {
  try {
    if (!url) {
      Toast.show({ type: 'error', text1: 'No document found' });
      return;
    }

    const fileName = url.split('/').pop();
    const downloadUri = FileSystem.cacheDirectory + fileName;

    const downloadResumable = FileSystem.createDownloadResumable(url, downloadUri);
    const { uri } = await downloadResumable.downloadAsync();
    console.log('✅ Downloaded to:', uri);

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri);
      Toast.show({ type: 'success', text1: 'Ready to share' });
    } else {
      Toast.show({ type: 'error', text1: 'Sharing not supported on this device' });
    }
  } catch (error) {
    Toast.show({ type: 'error', text1: 'Operation failed', text2: error.message });
  }
};

  const handleStatusChange = async (offerId, companyId, contractorId, status) => {
    if (status === 'ACCEPTED') {
      setSelectedContractId(offerId);
      setSignatureModalVisible(true);
    } else {
      await sendStatusUpdate(offerId, companyId, contractorId, status);
    }
  };

  const sendStatusUpdate = async (offerId, companyId, contractorId, status) => {
    try {
      setIsLoading(true);
      const resp = await fetch('https://alpinum-consulting.vercel.app/api/offers', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ offerId, companyId, contractorId, status }),
      });
      const result = await resp.json();
      if (!resp.ok) throw new Error(result.error);
      setOffers(result.offers);
      Toast.show({ type: 'success', text1: `Offer ${status.toLowerCase()}` });
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Error updating offer', text2: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const renderOffer = ({ item }) => {
    const company = item.company?.companyProfile || {};
    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <Image
            source={{ uri: company.logoUrl || 'https://via.placeholder.com/100' }}
            style={styles.logo}
          />
          <View style={styles.info}>
            <Text style={styles.companyName}>{company.companyName}</Text>
            <TouchableOpacity onPress={() => handleViewCompany(company.id)}>
              <Text style={styles.linkText}>View Company Profile</Text>
            </TouchableOpacity>
            <Text style={styles.detailText}>{company.industry}</Text>
            <Text style={styles.detailText}>{company.location}</Text>
          </View>
        </View>

        {item.status === 'PENDING' ? (
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => handleDownload(item.contractDocument)}>
              <Text style={styles.download}>📄 Download</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={() =>
                handleStatusChange(item.id, item.companyId, item.contractorId, 'ACCEPTED')
              }
            >
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rejectButton}
              onPress={() =>
                handleStatusChange(item.id, item.companyId, item.contractorId, 'REJECTED')
              }
            >
              <Text style={styles.buttonText}>Reject</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.statusWrap}>
            <Text style={[styles.status, styles[`status_${item.status}`]]}>
              {item.status}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <>
      <TopHeader />
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={styles.title}>Contract Offers</Text>

        <SignatureModal
          visible={signatureModalVisible}
          onClose={() => setSignatureModalVisible(false)}
          onConfirm={() => {
            const offer = offers.find((o) => o.id === selectedContractId);
            sendStatusUpdate(offer.id, offer.companyId, offer.contractorId, 'ACCEPTED');
            setSignatureModalVisible(false);
          }}
          contractId={selectedContractId}
          contractorId={offers.find((o) => o.id === selectedContractId)?.contractorId}
          signedBy={signedBy}
        />

        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionTitle}>Contract Offers Management</Text>
          <Text style={styles.descriptionText}>
            Review and manage all contract offers received from companies. Take action on pending offers,
            track accepted contracts, and maintain a clear overview of your professional opportunities.
          </Text>
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color="#f47920" style={{ marginTop: 20 }} />
        ) : offers.length > 0 ? (
          <FlatList
            data={offers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderOffer}
          />
        ) : (
          <Text style={{ marginTop: 20 }}>No offers found.</Text>
        )}
      </View>
    </>
  );
};

export default Offers;


const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  descriptionBox: {
  marginBottom: 20,
  padding: 14,
  backgroundColor: '#fff',
  borderRadius: 8,
  elevation: 2,
},
descriptionTitle: {
  fontSize: 18,
  fontWeight: '700',
  color: '#333',
  marginBottom: 6,
},
descriptionText: {
  fontSize: 14,
  color: '#555',
  lineHeight: 20,
},
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  info: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#f47920',
    marginTop: 4,
  },
  detailText: {
    color: '#666',
    fontSize: 13,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 14,
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 6,
  },
  rejectButton: {
    backgroundColor: '#F44336',
    padding: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
  },
  download: {
    color: '#f47920',
    padding: 8,
  },
  statusWrap: {
    marginTop: 14,
    alignItems: 'center',
  },
  status: {
    padding: 6,
    borderRadius: 6,
    color: '#fff',
    fontWeight: 'bold',
  },
  status_PENDING: {
    backgroundColor: '#f0ad4e',
  },
  status_ACCEPTED: {
    backgroundColor: '#5cb85c',
  },
  status_REJECTED: {
    backgroundColor: '#d9534f',
  },
  status_SIGNED: {
    backgroundColor: '#5bc0de',
  },
});

