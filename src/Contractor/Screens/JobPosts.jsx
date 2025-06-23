import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import TopHeader from '../../Components/TopHeader';

const PublicJobPostsScreen = () => {
  const token = useSelector((state) => state.auth.token);
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [jobPosts, setJobPosts] = useState([]);

  useEffect(() => {
    if (token) getJobPosts();
  }, [token]);

  const getJobPosts = async () => {
    setIsLoading(true);
    try {
      const resp = await fetch('https://alpinum-consulting.vercel.app/api/job-posts', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const result = await resp.json();
      if (!resp.ok) throw new Error(result.error);
      setJobPosts(result.data);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to load jobs',
        text2: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleJobPress = (jobId) => {
    navigation.navigate('JobDetail', { jobId });
  };

  return (
    <>
    <TopHeader/>
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Explore Job Posts</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#f47920" style={{ marginTop: 20 }} />
      ) : jobPosts.length > 0 ? (
        jobPosts.map((job, i) => (
          <TouchableOpacity key={i} onPress={() => handleJobPress(job.id)} style={styles.card}>
            <View style={styles.header}>
              <Image
                source={{
                  uri:
                    job.company?.companyProfile?.logoUrl ||
                    'https://via.placeholder.com/120?text=Logo',
                }}
                style={styles.logo}
              />
              <View style={styles.content}>
                <Text style={styles.companyName}>
                  {job.company?.companyProfile?.companyName}
                </Text>
                <Text style={styles.role}>{job.role}</Text>
                <Text style={styles.meta}>
                  {job.rate} {job.currency}/hr • {formatDate(job.createdAt)}
                </Text>
              </View>
            </View>
            <View style={styles.skillsWrap}>
              {job.skills?.map((skill, index) => (
                <View key={index} style={styles.skill}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.emptyBox}>
          <Text style={styles.warningIcon}>⚠️</Text>
          <Text style={styles.emptyTitle}>No Job Posts Found</Text>
          <Text style={styles.emptyText}>
            Please check back later or explore other sections of the platform.
          </Text>
        </View>
      )}
    </ScrollView>
    </>
  );
};

export default PublicJobPostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#f8f8f8',
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
    borderRadius: 10,
    marginRight: 12,
    backgroundColor: '#eee',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  companyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  role: {
    fontSize: 15,
    color: '#111',
    marginVertical: 4,
  },
  meta: {
    color: '#666',
    fontSize: 13,
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  skill: {
    backgroundColor: '#f47920',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 6,
  },
  skillText: {
    color: '#fff',
    fontSize: 12,
  },
  emptyBox: {
    alignItems: 'center',
    marginTop: 50,
  },
  warningIcon: {
    fontSize: 32,
    color: '#FFA500',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 6,
    paddingHorizontal: 10,
  },
});
