import React, { useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import TopHeader from "../../Components/TopHeader";

const Dashboard = () => {
  return (
    <>
      <TopHeader />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Company Dashboard</Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Welcome</Text>
          <Text style={styles.paragraph}>
            Connect with skilled contractors and find the perfect match for your
            projects. Complete your company profile to start engaging with
            potential contractors and schedule meetings.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Getting Started</Text>

          <Text style={styles.stepTitle}>1. Complete Company Profile</Text>
          <Text style={styles.paragraph}>
            Start by completing your company profile. Add your company
            description, industry focus, and the types of skills you're looking
            for. A detailed profile helps contractors understand your needs
            better.
          </Text>

          <Text style={styles.stepTitle}>2. Browse Contractor Profiles</Text>
          <Text style={styles.paragraph}>
            Once your profile is complete, you'll gain access to our contractor
            database. Browse through profiles, view resumes, and filter by
            skills, experience, and availability to find the perfect match for
            your projects.
          </Text>

          <Text style={styles.stepTitle}>3. Schedule Meetings</Text>
          <Text style={styles.paragraph}>
            Found a promising contractor? Send them a meeting invitation through
            our platform. You can discuss project details, requirements, and
            determine if there's a good fit for collaboration.
          </Text>

          <Text style={styles.stepTitle}>4. Offer Contract</Text>
          <Text style={styles.paragraph}>
            You can search for a contractor from the list of contractors. Once
            you've found the perfect contractor, you can offer them a contract.
          </Text>

          <Text style={styles.stepTitle}>5. Manage Contracts</Text>
          <Text style={styles.paragraph}>
            Once a contractor accepts your offer, you can view the contract and
            manage it. You can also view the status of the contracts and manage
            them.
          </Text>

          <Text style={styles.stepTitle}>6. Create Job Post</Text>
          <Text style={styles.paragraph}>
            Create a job post with detailed requirements and experience levels
            to hire a contractor.
          </Text>

          <Text style={styles.stepTitle}>7. Manage Job Posts</Text>
          <Text style={styles.paragraph}>
            You can view all the job posts you've created and manage them. You
            can also edit and delete the job post.
          </Text>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 15,
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
});

export default Dashboard;
