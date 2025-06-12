"use client";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import TopHeader from "../Components/TopHeader";

export default function Dashboard() {
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth.user);

  //   useEffect(() => {
  //     if (user?.role !== "CONTRACTOR") {
  //       navigation.replace("CompanyDashboard");
  //     }
  //   }, [user]);

  return (
    <View>
      <TopHeader />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleContainer}>
          <View style={styles.verticalLine} />
          <Text style={styles.title}>Contractor Dashboard</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.welcomeText}>
            Welcome{" "}
            <Text style={styles.highlight}>
              {user?.firstName} {user?.lastName}
            </Text>
          </Text>
          <Text style={styles.paragraph}>
            We're glad to have you here! Use the dashboard to manage your
            profile, update your availability, and showcase your skills to
            potential employers. If you need any help, feel free to reach out.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Getting Started</Text>

          <Text style={styles.stepTitle}>1. Upload Your Resume</Text>
          <Text style={styles.paragraph}>
            First, upload your resume. Our system will automatically extract
            your information from your resume to build your user profile. This
            saves you time and ensures all relevant skills and experience are
            captured.
          </Text>

          <Text style={styles.stepTitle}>2. Complete Your Profile</Text>
          <Text style={styles.paragraph}>
            Review and edit your profile information extracted from your resume.
            You can update or add missing details like your hourly rate,
            availability, work preferences, and additional skills. A complete
            profile improves your visibility.
          </Text>

          <Text style={styles.stepTitle}>3. Enroll in Courses</Text>
          <Text style={styles.paragraph}>
            Once your profile is complete and your resume is uploaded, you can
            browse and enroll in available courses. Our courses are designed to
            enhance your skills and make you more competitive in your field.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom:70
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  verticalLine: {
    width: 4,
    height: "100%",
    backgroundColor: "#f47920",
    marginRight: 10,
    borderRadius: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
  },

  card: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  highlight: {
    color: "#f47920",
  },
  paragraph: {
    fontSize: 16,
    color: "#555",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  stepTitle: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 6,
  },
});
