import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const CompanyProfileOverview = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const navigation = useNavigation();

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://alpinum-consulting.vercel.app/api/company/company-profile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setUserData(result);

      if (!response.ok) {
        alert(result.error || "Oops! Something Went Wrong!");
      }
    } catch (err) {
      alert("Failed to load profile");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchProfile();
  }, [token]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const company = userData?.companyProfile;
  const user = userData?.user;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Company Profile Overview</Text>

      {company ? (
        <View style={styles.card}>
          <Image
            style={styles.logo}
            source={{
              uri:
                company.logoUrl ||
                "https://via.placeholder.com/120x120.png?text=Logo",
            }}
          />
          <View style={styles.info}>
            <Text style={styles.companyName}>{company.companyName}</Text>
            {company.location && (
              <Text style={styles.location}>{company.location}</Text>
            )}
            <TouchableOpacity
              onPress={() => navigation.navigate("EditProfile")}
              style={styles.editButton}
            >
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.companyName}>No company profile found.</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("EditProfile")}
            style={styles.editButton}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      )}

      {user && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{user.email}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Joining Date:</Text>
            <Text style={styles.value}>
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </View>

          {company?.website && (
            <View style={styles.detailRow}>
              <Text style={styles.label}>Website:</Text>
              <Text
                style={[styles.value, styles.link]}
                onPress={() => Linking.openURL(company.website)}
              >
                {company.website}
              </Text>
            </View>
          )}

          {company?.industry && (
            <View style={styles.detailRow}>
              <Text style={styles.label}>Industry:</Text>
              <Text style={styles.value}>{company.industry}</Text>
            </View>
          )}

          {company?.description && (
            <View style={styles.detailRow}>
              <Text style={styles.label}>Description:</Text>
              <Text style={styles.value}>{company.description}</Text>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  info: {
    marginTop: 12,
    alignItems: "center",
  },
  companyName: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: "#777",
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: "#f47920",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    fontWeight: "600",
    width: 120,
  },
  value: {
    flex: 1,
    color: "#333",
  },
  link: {
    color: "#007BFF",
  },
});

export default CompanyProfileOverview;
