import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import TopHeader from '../Components/TopHeader';

const JobDetail = () => {
  const { params } = useRoute();
  const { jobId } = params;

  const token = useSelector((state) => state.auth.token);
  const [jobInfo, setJobInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (jobId) fetchJob();
  }, [jobId]);

  const fetchJob = async () => {
    setIsLoading(true);
    try {
      const resp = await fetch(`https://alpinum-consulting.vercel.app/api/company/job-posts/${jobId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await resp.json();
      if (!resp.ok) throw new Error(result.message || 'Something went wrong');

      setJobInfo(result.data);
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error fetching job',
        text2: err.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) =>
    dateString
      ? new Date(dateString).toLocaleDateString()
      : 'N/A';

  const renderJobType = (type) => {
    const map = {
      FULL_TIME: 'Full Time',
      PART_TIME: 'Part Time',
      CONTRACT: 'Contract',
      FREELANCE: 'Freelance',
    };
    return map[type] || type;
  };

  return (
    <>
    <TopHeader/>
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Job Details</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#f47920" />
      ) : jobInfo ? (
        <View style={styles.card}>
          <Text style={styles.role}>{jobInfo.role}</Text>

          <View style={styles.infoTable}>
            <Row label="Location" value={jobInfo.location} />
            <Row label="Job Type" value={renderJobType(jobInfo.jobType)} />
            <Row label="Experience" value={`${jobInfo.experience} Years`} />
            <Row
              label="Rate"
              value={`${jobInfo.currency} ${jobInfo.rate}/hour`}
            />
            <Row label="Availability" value={formatDate(jobInfo.availability)} />
          </View>

          <Section title="Description" content={jobInfo.description} />
          <Section title="Additional Requirements" content={jobInfo.additionalRequirements} />
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Required Skills</Text>
            <View style={styles.skillList}>
              {jobInfo.skills?.map((skill, idx) => (
                <Text key={idx} style={styles.skillTag}>{skill}</Text>
              ))}
            </View>
          </View>
        </View>
      ) : (
        <Text>No job data found.</Text>
      )}
    </ScrollView>
    </>
  );
};

const Row = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const Section = ({ title, content }) => {
  if (!content) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionContent}>{content.replace(/<\/?[^>]+(>|$)/g, '')}</Text>
    </View>
  );
};

export default JobDetail;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  role: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  infoTable: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  label: {
    fontWeight: '600',
    width: 130,
    color: '#333',
  },
  value: {
    flex: 1,
    color: '#555',
  },
  section: {
    marginTop: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
    color: '#000',
  },
  sectionContent: {
    color: '#444',
    fontSize: 14,
    lineHeight: 20,
  },
  skillList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  skillTag: {
    backgroundColor: '#f47920',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 6,
    fontSize: 12,
  },
});
