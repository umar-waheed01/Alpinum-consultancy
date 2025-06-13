import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';

const ProfileOverview = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const navigation = useNavigation();
  

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("https://alpinum-consulting.vercel.app/api/contractor-profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (!response.ok) {
          Toast.show({
            type:'error',
            text1:'Error',
            text2: data?.error || "Failed to fetch profile"
          })
        } else {
          setProfileData(data);
        }
      } catch (err) {
        Alert.alert("Error", "Unable to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!profileData?.CV || !profileData?.user) {
    return (
      <View style={styles.centered}>
        <Text>Error loading profile data</Text>
      </View>
    );
  }

  const { user, CV } = profileData;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Profile Overview</Text>
      <View style={styles.profileSection}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: CV.imageUrl }} style={styles.profileImage} />
          <TouchableOpacity style={styles.editButton} onPress={()=>navigation.navigate('EditProfile')}>
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.role}>{CV.designation}</Text>
          <Text style={styles.name}>{`${user.firstName} ${user.lastName}`}</Text>
          <View style={styles.tags}>
            <Text style={styles.tag}>{CV.languages?.join(', ')}</Text>
            <Text style={styles.tag}>{CV.country}</Text>
            <Text style={styles.tag}>{CV.hourlyRate}$/hr</Text>
          </View>
        </View>
      </View>

      <View style={styles.overviewBox}>
        <Text style={styles.subHeading}>Experience</Text>
        <Text>{CV.yearsExperience} Years</Text>

        <Text style={styles.subHeading}>Location</Text>
        <Text>{CV.city}, {CV.country}</Text>

        <Text style={styles.subHeading}>Tokens</Text>
        <Text>{user.connects}</Text>

        <Text style={styles.subHeading}>Education</Text>
        <Text>{CV.degreeInfo}</Text>

        <Text style={styles.subHeading}>Programming Languages</Text>
        <Text>{CV.languages?.join(', ')}</Text>

        <Text style={styles.subHeading}>Tools</Text>
        <Text>{CV.tools?.join(', ')}</Text>

        <Text style={styles.subHeading}>Methodologies</Text>
        <Text>{CV.methodologies?.join(', ')}</Text>

        {CV.socialLink?.map((link, index) => (
          link.url ? (
            <TouchableOpacity key={index} onPress={() => Linking.openURL(link.url)}>
              <Text style={styles.link}>{link.platform}</Text>
            </TouchableOpacity>
          ) : null
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 12,
  },
  profileSection: {
    flexDirection: 'row',
    // backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    // alignItems: 'center',
  },
  imageContainer:{
    // gap:5
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
    marginLeft:6
  },
  role: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  tags: {
    flexDirection: 'column',
    gap: 4,
  },
  tag: {
    fontSize: 14,
    color: '#555',
  },
  overviewBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },
  link: {
    color: '#007bff',
    marginTop: 8,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
    editButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#504CFE",
    borderRadius: 8,
    width:100,
    height:45
  },
  editText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default ProfileOverview;


// import React from "react";
// import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

// const ProfileOverview = () => {
//   const staticData = {
//     user: {
//       firstName: "John",
//       lastName: "Doe",
//       connects: 30,
//     },
//     CV: {
//       imageUrl: null,
//       mainRole: "Frontend Developer",
//       languages: ["JavaScript", "TypeScript"],
//       tools: ["React", "Redux", "Expo"],
//       methodologies: ["Agile", "Scrum"],
//       country: "USA",
//       city: "New York",
//       hourlyRate: 40,
//       yearsExperience: 5,
//       degreeInfo: "Bachelor of Science in Computer Science",
//       socialLink: [
//         { platform: "linkedin", url: "https://linkedin.com/in/example" },
//         { platform: "github", url: "https://github.com/example" },
//       ],
//     },
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.header}>Profile Overview</Text>
//       <View style={styles.profileCard}>
//         <Image
//           source={
//             staticData.CV.imageUrl
//               ? { uri: staticData.CV.imageUrl }
//               : require("../Images/logo.jpeg")
//           }
//           style={styles.profileImage}
//         />
//         <View style={styles.profileInfo}>
//           <Text style={styles.mainRole}>{staticData.CV.mainRole}</Text>
//           <Text style={styles.name}>{`${staticData.user.firstName} ${staticData.user.lastName}`}</Text>
//           <View style={styles.metaRow}>
//             <Text style={styles.tag}>{staticData.CV.languages.join(", ")}</Text>
//             <Text style={styles.location}>{staticData.CV.country}</Text>
//             <Text style={styles.rate}>${staticData.CV.hourlyRate}/hr</Text>
//           </View>
//         </View>
//         <TouchableOpacity style={styles.editButton}>
//           <Text style={styles.editText}>Edit Profile</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.detailsCard}>
//         <Text style={styles.title}>Experience</Text>
//         <Text style={styles.content}>{staticData.CV.yearsExperience} Years</Text>

//         <Text style={styles.title}>Location</Text>
//         <Text style={styles.content}>{`${staticData.CV.city}, ${staticData.CV.country}`}</Text>

//         <Text style={styles.title}>Tokens</Text>
//         <Text style={styles.content}>{staticData.user.connects}</Text>

//         <Text style={styles.title}>Education</Text>
//         <Text style={styles.content}>{staticData.CV.degreeInfo}</Text>

//         <Text style={styles.title}>Programming Languages</Text>
//         <Text style={styles.content}>{staticData.CV.languages.join(", ")}</Text>

//         <Text style={styles.title}>Tools</Text>
//         <Text style={styles.content}>{staticData.CV.tools.join(", ")}</Text>

//         <Text style={styles.title}>Methodologies</Text>
//         <Text style={styles.content}>{staticData.CV.methodologies.join(", ")}</Text>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: "#F9FAFB",
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   profileCard: {
//     backgroundColor: "#fff",
//     padding: 20,
//     borderRadius: 12,
//     marginBottom: 20,
//     alignItems: "center",
//     elevation: 2,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 12,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//   },
//   profileInfo: {
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   mainRole: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   name: {
//     fontSize: 18,
//     marginTop: 5,
//     fontWeight: "600",
//   },
//   metaRow: {
//     flexDirection: "row",
//     gap: 10,
//     flexWrap: "wrap",
//     justifyContent: "center",
//     marginTop: 8,
//   },
//   tag: {
    // backgroundColor: "#eee",
    // paddingHorizontal: 8,
    // paddingVertical: 4,
    // borderRadius: 6,
//   },
//   location: {
//     backgroundColor: "#eee",
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 6,
//   },
//   rate: {
//     backgroundColor: "#eee",
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 6,
//   },
  // editButton: {
  //   marginTop: 10,
  //   padding: 10,
  //   backgroundColor: "#504CFE",
  //   borderRadius: 8,
  // },
  // editText: {
  //   color: "#fff",
  //   fontWeight: "600",
  // },
//   detailsCard: {
//     backgroundColor: "#fff",
//     padding: 20,
//     borderRadius: 12,
//     elevation: 2,
//   },
//   title: {
//     fontWeight: "bold",
//     fontSize: 16,
//     marginTop: 12,
//     marginBottom: 4,
//   },
//   content: {
//     color: "#333",
//   },
// });

// export default ProfileOverview;
