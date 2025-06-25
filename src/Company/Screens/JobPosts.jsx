import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import TopHeader from '../../Components/TopHeader';

const JobPosts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [jobPosts, setJobPosts] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const navigation = useNavigation();

  useEffect(() => {
    fetchJobPosts();
  }, []);

  const fetchJobPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        'https://alpinum-consulting.vercel.app/api/company/job-posts',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      if (response.ok) {
        setJobPosts(result.data);
      } else {
        Toast.show({ type: 'error', text1: result.error });
      }
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Failed to fetch job posts' });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('JobDetail', { jobId: item.id })}
      style={styles.card}
    >
      <View style={styles.header}>
        <Image
          source={{
            uri:
              item.company.companyProfile.logoUrl ||
              'https://via.placeholder.com/120',
          }}
          style={styles.logo}
        />
        <View style={styles.content}>
          <Text style={styles.companyName}>{item.company.companyProfile.companyName}</Text>
          <Text style={styles.role}>{item.role}</Text>
          <Text style={styles.meta}>
            {item.currency} {item.rate}/hr • {formatDate(item.createdAt)}
          </Text>
        </View>
      </View>
      <View style={styles.skillsWrap}>
        {item.skills.map((skill, index) => (
          <View key={index} style={styles.skillTag}>
            <Text style={styles.skillText}>{skill}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <>
    <TopHeader/>
    <ScrollView style={styles.container}>
      <Text style={styles.title}>All Job Posts</Text>
      <Text style={styles.title}>Job Post Management</Text>
      <Text style={styles.subtitle}>
        Create and manage your company's job postings here. You can create new job posts with detailed requirements & experience levels. View all your job posts and manage the hiring process efficiently.
      </Text>

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('CreateJobPost')}
      >
        <Text style={styles.createText}>Create Job Post</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Available Job Posts</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#504CFE" style={{ marginTop: 30 }} />
      ) : jobPosts.length > 0 ? (
        <FlatList
          data={jobPosts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          scrollEnabled={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>⚠️ No Job Posts Found</Text>
          <Text style={styles.emptyDescription}>
            You haven’t created any job posts yet. Tap below to create your first job posting.
          </Text>
          <TouchableOpacity
            style={[styles.createButton, { marginTop: 10 }]}
            onPress={() => navigation.navigate('CreateJobPost')}
          >
            <Text style={styles.createText}>Create Job Post</Text>
          </TouchableOpacity>
        </View>
      )}
      <Toast />
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    color: '#555',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  createButton: {
    backgroundColor: '#f47920',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 24,
  },
  createText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 16,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  companyName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  role: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  meta: {
    fontSize: 13,
    color: '#777',
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  skillTag: {
    backgroundColor: '#eee',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 6,
  },
  skillText: {
    fontSize: 13,
    color: '#333',
  },
  empty: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFA500',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default JobPosts;
