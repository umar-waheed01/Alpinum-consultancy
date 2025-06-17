import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Linking,
} from 'react-native';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import TopHeader from "./../Components/TopHeader"

const Training = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const [allCourses, setAllCourses] = useState([]);
  const [userEnrolledCourses, setUserEnrolledCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token) allMoodleCourse();
  }, [token]);

  const isUserEnrolled = (courseId) =>
    userEnrolledCourses.some((enroll) => enroll.moodleCourseId === courseId);

  const allMoodleCourse = async () => {
    setIsLoading(true);
    try {
      const resp = await fetch('https://alpinum-consulting.vercel.app/api/moodle-courses', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const result = await resp.json();
      setAllCourses(result.courses);
      allEnrolledCourses();
    } catch (err) {
      Toast.show({ type: 'error', text1: 'Error fetching courses' });
    } finally {
      setIsLoading(false);
    }
  };

  const allEnrolledCourses = async () => {
    setIsLoading(true);
    try {
      const resp = await fetch('https://alpinum-consulting.vercel.app/api/moodle-courses', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const result = await resp.json();
      console.log("++++++++".result)
      setUserEnrolledCourses(result.userEnrollments || []);
    } catch (err) {
      Toast.show({ type: 'error', text1: 'Error fetching enrollments' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (course) => {
    setIsLoading(true);
    try {
      const resp = await fetch('https://your-api.com/api/course-enrollment', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: course.courseId,
          courseName: course.courseName,
        }),
      });

      const result = await resp.json();
      if (resp.status === 201) {
        Toast.show({ type: 'success', text1: result.message });
        allEnrolledCourses();
      } else {
        Toast.show({ type: 'error', text1: result.error });
      }
    } catch (err) {
      Toast.show({ type: 'error', text1: 'Error enrolling in course' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <TopHeader/>
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Courses</Text>
      <Text>If you are not enrolled in any course, you'll receive a confirmation email with credentials to access your enrolled courses. Use the Moodle portal link to access your enrolled courses.</Text>

      <TouchableOpacity
        style={styles.portalLink}
        onPress={() =>
          Linking.openURL('https://alpinumtraining.moodlecloud.com/')
        }
      >
        <Text style={styles.linkText}>Visit Moodle Portal</Text>
      </TouchableOpacity>

      {isLoading ? (
        <ActivityIndicator size="large" color="#f47920" />
      ) : allCourses.length > 0 ? (
        allCourses.map((course, i) => {
          const enrolled = isUserEnrolled(course.courseId);
          return (
            <View key={i} style={styles.card}>
              <Text style={styles.courseName}>{course.courseName}</Text>
              <Text style={styles.tokens}>Tokens Required: 50</Text>
              <Text>
                Start Date:{' '}
                {new Date(course.startDate).toLocaleDateString() || ''}
              </Text>
              <Text>
                End Date:{' '}
                {new Date(course.endDate).toLocaleDateString() || ''}
              </Text>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    enrolled && styles.disabledButton,
                  ]}
                  onPress={() =>
                    !enrolled ? handleSubmit(course) : null
                  }
                  disabled={enrolled}
                >
                  <Text style={styles.buttonText}>
                    {enrolled ? 'Enrolled' : 'Enroll Now'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={() =>
                    Linking.openURL(
                      `https://alpinumtraining.moodlecloud.com/course/view.php?id=${course.courseId}`
                    )
                  }
                >
                  <Text style={styles.linkText}>View Activity</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })
      ) : (
        <Text>No courses available at the moment. Please try again.</Text>
      )}
    </ScrollView>
    </>
  );
};

export default Training;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  portalLink: {
    backgroundColor: '#f47920',
    padding: 12,
    borderRadius: 6,
    marginBottom: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#fff',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  courseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tokens: {
    marginBottom: 6,
    color: '#333',
  },
  actions: {
    marginTop: 10,
  },
  button: {
    backgroundColor: '#f47920',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  secondaryButton: {
    padding: 8,
    alignItems: 'center',
  },
});
