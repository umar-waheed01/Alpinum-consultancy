import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Button,
  StyleSheet,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import Toast from "react-native-toast-message";

const CreateJobPost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(null);

  const rawSkillsOptions = [
    { value: "ABAP", label: "ABAP" },
    { value: "ActionScript", label: "ActionScript" },
    { value: "Ada", label: "Ada" },
    { value: "Apex", label: "Apex" },
    { value: "APL", label: "APL" },
    { value: "Assembly", label: "Assembly" },
    { value: "Ballerina", label: "Ballerina" },
    { value: "Bash", label: "Bash" },
    { value: "BASIC", label: "BASIC" },
    { value: "C", label: "C" },
    { value: "C#", label: "C#" },
    { value: "C++", label: "C++" },
    { value: "Clojure", label: "Clojure" },
    { value: "COBOL", label: "COBOL" },
    { value: "CoffeeScript", label: "CoffeeScript" },
    { value: "Common Lisp", label: "Common Lisp" },
    { value: "Crystal", label: "Crystal" },
    { value: "D", label: "D" },
    { value: "Dart", label: "Dart" },
    { value: "Delphi", label: "Delphi" },
    { value: "Elixir", label: "Elixir" },
    { value: "Elm", label: "Elm" },
    { value: "Erlang", label: "Erlang" },
    { value: "F#", label: "F#" },
    { value: "Fortran", label: "Fortran" },
    { value: "Go", label: "Go" },
    { value: "Groovy", label: "Groovy" },
    { value: "Haskell", label: "Haskell" },
    { value: "HTML/CSS", label: "HTML/CSS" },
    { value: "Java", label: "Java" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "Julia", label: "Julia" },
    { value: "Kotlin", label: "Kotlin" },
    { value: "LabVIEW", label: "LabVIEW" },
    { value: "Ladder Logic", label: "Ladder Logic" },
    { value: "Lisp", label: "Lisp" },
    { value: "Logo", label: "Logo" },
    { value: "Lua", label: "Lua" },
    { value: "MATLAB", label: "MATLAB" },
    { value: "Nim", label: "Nim" },
    { value: "Objective-C", label: "Objective-C" },
    { value: "OCaml", label: "OCaml" },
    { value: "Pascal", label: "Pascal" },
    { value: "Perl", label: "Perl" },
    { value: "PHP", label: "PHP" },
    { value: "PL/SQL", label: "PL/SQL" },
    { value: "PowerShell", label: "PowerShell" },
    { value: "Prolog", label: "Prolog" },
    { value: "Python", label: "Python" },
    { value: "R", label: "R" },
    { value: "Racket", label: "Racket" },
    { value: "Raku", label: "Raku" },
    { value: "REXX", label: "REXX" },
    { value: "Ruby", label: "Ruby" },
    { value: "Rust", label: "Rust" },
    { value: "SAS", label: "SAS" },
    { value: "Scala", label: "Scala" },
    { value: "Scheme", label: "Scheme" },
    { value: "Scratch", label: "Scratch" },
    { value: "Shell", label: "Shell" },
    { value: "Smalltalk", label: "Smalltalk" },
    { value: "Solidity", label: "Solidity" },
    { value: "SQL", label: "SQL" },
    { value: "Swift", label: "Swift" },
    { value: "Tcl", label: "Tcl" },
    { value: "TypeScript", label: "TypeScript" },
    { value: "VB.NET", label: "VB.NET" },
    { value: "Visual Basic", label: "Visual Basic" },
    { value: "WebAssembly", label: "WebAssembly" },
    { value: "VHDL", label: "VHDL" },
    { value: "Verilog", label: "Verilog" },
    { value: "Zig", label: "Zig" },
    { value: "Agile", label: "Agile" },
    { value: "Scrum", label: "Scrum" },
    { value: "Kanban", label: "Kanban" },
    { value: "Lean", label: "Lean" },
    { value: "Waterfall", label: "Waterfall" },
    { value: "TDD", label: "TDD" },
    { value: "BDD", label: "BDD" },
    { value: "XP", label: "XP (Extreme Programming)" },
    { value: "FDD", label: "FDD (Feature-Driven Development)" },
    { value: "DSDM", label: "DSDM (Dynamic Systems Development Method)" },
    { value: "Crystal", label: "Crystal" },
    { value: "UVM", label: "UVM (Universal Verification Methodology)" },
    { value: "RUP", label: "RUP (Rational Unified Process)" },
    { value: "SAFe", label: "SAFe (Scaled Agile Framework)" },
    { value: "DevOps", label: "DevOps" },
    { value: "RAD", label: "RAD (Rapid Application Development)" },
    { value: "Spiral", label: "Spiral" },
    { value: "Prince2", label: "PRINCE2" },
    { value: "PMI/PMBOK", label: "PMI/PMBOK" },
    { value: "LeSS", label: "LeSS (Large-Scale Scrum)" },
    { value: "SixSigma", label: "Six Sigma" },
    { value: "Nexus", label: "Nexus" },
    { value: "Scrumban", label: "Scrumban" },
    { value: "Cadence Simulator", label: "Cadence Simulator" },
    { value: "ModelSim", label: "ModelSim" },
    { value: "Vivado", label: "Vivado" },
    { value: "Quartus", label: "Quartus" },
    { value: "Synopsys", label: "Synopsys" },
    { value: "Altium Designer", label: "Altium Designer" },
    { value: "Xilinx ISE", label: "Xilinx ISE" },
    { value: "LTspice", label: "LTspice" },
    { value: "OrCAD", label: "OrCAD" },
    { value: "Mentor Graphics", label: "Mentor Graphics" },
    { value: "Verilog", label: "Verilog" },
    { value: "VHDL", label: "VHDL" },
    { value: "Proteus", label: "Proteus" },
    { value: "KiCad", label: "KiCad" },
    { value: "React", label: "React" },
    { value: "Angular", label: "Angular" },
    { value: "Vue.js", label: "Vue.js" },
    { value: "Node.js", label: "Node.js" },
    { value: "Laravel", label: "Laravel" },
    { value: "Django", label: "Django" },
    { value: "Flask", label: "Flask" },
    { value: "Spring Boot", label: "Spring Boot" },
    { value: "Express.js", label: "Express.js" },
    { value: "Ruby on Rails", label: "Ruby on Rails" },
    { value: "ASP.NET", label: "ASP.NET" },
    { value: "WordPress", label: "WordPress" },
    { value: "Gatsby", label: "Gatsby" },
    { value: "Next.js", label: "Next.js" },
    { value: "Svelte", label: "Svelte" },
    { value: "React Native", label: "React Native" },
    { value: "Flutter", label: "Flutter" },
    { value: "Swift/UIKit", label: "Swift/UIKit" },
    { value: "SwiftUI", label: "SwiftUI" },
    { value: "Kotlin/Android", label: "Kotlin/Android" },
    { value: "Xamarin", label: "Xamarin" },
    { value: "Ionic", label: "Ionic" },
    { value: "Visual Studio Code", label: "Visual Studio Code" },
    { value: "Visual Studio", label: "Visual Studio" },
    { value: "IntelliJ IDEA", label: "IntelliJ IDEA" },
    { value: "Eclipse", label: "Eclipse" },
    { value: "PyCharm", label: "PyCharm" },
    { value: "Android Studio", label: "Android Studio" },
    { value: "Xcode", label: "Xcode" },
    { value: "WebStorm", label: "WebStorm" },
    { value: "Sublime Text", label: "Sublime Text" },
    { value: "Vim", label: "Vim" },
    { value: "Emacs", label: "Emacs" },
    { value: "Atom", label: "Atom" },
    { value: "Docker", label: "Docker" },
    { value: "Kubernetes", label: "Kubernetes" },
    { value: "Jenkins", label: "Jenkins" },
    { value: "GitHub Actions", label: "GitHub Actions" },
    { value: "GitLab CI/CD", label: "GitLab CI/CD" },
    { value: "Travis CI", label: "Travis CI" },
    { value: "CircleCI", label: "CircleCI" },
    { value: "Terraform", label: "Terraform" },
    { value: "Ansible", label: "Ansible" },
    { value: "Puppet", label: "Puppet" },
    { value: "Chef", label: "Chef" },
    { value: "AWS", label: "AWS" },
    { value: "Azure", label: "Azure" },
    { value: "GCP", label: "GCP" },
    { value: "Heroku", label: "Heroku" },
    { value: "Vercel", label: "Vercel" },
    { value: "Netlify", label: "Netlify" },
    { value: "MySQL", label: "MySQL" },
    { value: "PostgreSQL", label: "PostgreSQL" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Redis", label: "Redis" },
    { value: "SQL Server", label: "SQL Server" },
    { value: "Oracle", label: "Oracle" },
    { value: "SQLite", label: "SQLite" },
    { value: "Firebase", label: "Firebase" },
    { value: "DynamoDB", label: "DynamoDB" },
    { value: "Cassandra", label: "Cassandra" },
    { value: "Jest", label: "Jest" },
    { value: "Mocha", label: "Mocha" },
    { value: "Selenium", label: "Selenium" },
    { value: "Cypress", label: "Cypress" },
    { value: "JUnit", label: "JUnit" },
    { value: "TestNG", label: "TestNG" },
    { value: "Pytest", label: "Pytest" },
    { value: "Postman", label: "Postman" },
    { value: "SoapUI", label: "SoapUI" },
    { value: "Swagger", label: "Swagger" },
    { value: "Figma", label: "Figma" },
    { value: "Sketch", label: "Sketch" },
    { value: "Adobe XD", label: "Adobe XD" },
    { value: "Photoshop", label: "Photoshop" },
    { value: "Illustrator", label: "Illustrator" },
    { value: "InDesign", label: "InDesign" },
    { value: "Zeplin", label: "Zeplin" },
    { value: "InVision", label: "InVision" },
    { value: "Jira", label: "Jira" },
    { value: "Trello", label: "Trello" },
    { value: "Asana", label: "Asana" },
    { value: "Confluence", label: "Confluence" },
    { value: "Monday.com", label: "Monday.com" },
    { value: "ClickUp", label: "ClickUp" },
    { value: "Microsoft Project", label: "Microsoft Project" },
    { value: "Basecamp", label: "Basecamp" },
    { value: "Notion", label: "Notion" },
  ];

  const skillsOptions = Array.from(
    new Map(rawSkillsOptions.map((item) => [item.value, item])).values()
  );

  const [formData, setFormData] = useState({
    role: "",
    description: "",
    additionalRequirements: "",
    experience: "",
    rate: "",
    currency: "",
    location: "",
    availability: new Date(),
    jobType: "",
    skills: [],
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const payload = {
        ...formData,
        availability: formData.availability.toISOString().split("T")[0],
      };
      console.log(payload);
      Toast.show({ type: "success", text1: "Job posted successfully" });
    } catch (err) {
      Toast.show({ type: "error", text1: "Failed to post job" });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleOption = (type, value) => {
    const selected = formData.skills.includes(value)
      ? formData.skills.filter((item) => item !== value)
      : [...formData.skills, value];
    setFormData({ ...formData, skills: selected });
  };

  const renderDropdown = (label, options, type) => {
    const selectedItems = formData.skills;

    return (
      <View style={styles.dropdownWrapper}>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity
          style={styles.dropdownInput}
          onPress={() => setDropdownVisible(type)}
        >
          <View style={styles.selectedItemsWrapper}>
            {selectedItems.length > 0 ? (
              selectedItems.map((item, idx) => (
                <Text key={`${item}-${idx}`} style={styles.selectedItemText}>
                  {item}
                </Text>
              ))
            ) : (
              <Text style={styles.placeholderText}>Select {label}</Text>
            )}
          </View>
        </TouchableOpacity>

        {dropdownVisible === type && (
          <Modal visible transparent animationType="fade">
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <ScrollView contentContainerStyle={styles.modalScrollContent}>
                  <Text style={styles.label}>Choose {label}</Text>
                  {options.map((option, idx) => {
                    const isSelected = selectedItems.includes(option.value);
                    return (
                      <TouchableOpacity
                        key={`${option.value}-${idx}`}
                        onPress={() => toggleOption(type, option.value)}
                        style={[
                          styles.optionItem,
                          isSelected && styles.optionSelected,
                        ]}
                      >
                        <Text style={{ color: isSelected ? "#fff" : "#000" }}>
                          {option.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={() => setDropdownVisible(null)}
                >
                  <Text style={styles.modalCloseText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.header}>Create Job Post</Text>
          <Text style={styles.header}>General Information</Text>
          <Text style={styles.label}>Job Role *</Text>
          <TextInput
            style={styles.input}
            value={formData.role}
            onChangeText={(text) => setFormData({ ...formData, role: text })}
          />

          <Text style={styles.label}>Job Description *</Text>
          <TextInput
            multiline
            numberOfLines={4}
            style={styles.textarea}
            value={formData.description}
            onChangeText={(text) =>
              setFormData({ ...formData, description: text })
            }
          />

          <Text style={styles.label}>Additional Requirements</Text>
          <TextInput
            multiline
            numberOfLines={4}
            style={styles.textarea}
            value={formData.additionalRequirements}
            onChangeText={(text) =>
              setFormData({ ...formData, additionalRequirements: text })
            }
          />

          <Text style={styles.label}>Years of Experience *</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.input}
            value={formData.experience}
            onChangeText={(text) =>
              setFormData({ ...formData, experience: text })
            }
          />

          <Text style={styles.label}>Rate *</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.input}
            value={formData.rate}
            onChangeText={(text) => setFormData({ ...formData, rate: text })}
          />

          <Text style={styles.label}>Currency *</Text>
          <RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={(value) =>
              setFormData({ ...formData, currency: value })
            }
            items={[
              { label: "USD", value: "USD" },
              { label: "GBP", value: "GBP" },
              { label: "EUR", value: "EUR" },
              { label: "INR", value: "INR" },
              { label: "AUD", value: "AUD" },
              { label: "CAD", value: "CAD" },
            ]}
            placeholder={{ label: "Select currency...", value: null }}
          />

          <Text style={styles.label}>Availability *</Text>
          {Platform.OS === "android" && (
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateButtonText}>
                Selected: {formData.availability.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
          )}
          {(showDatePicker || Platform.OS === "ios") && (
            <DateTimePicker
              value={formData.availability}
              mode="date"
              display={Platform.OS === "ios" ? "inline" : "default"}
              minimumDate={new Date()}
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setFormData({ ...formData, availability: selectedDate });
                }
              }}
            />
          )}

          <Text style={styles.label}>Job Type *</Text>
          <RNPickerSelect
            onValueChange={(value) =>
              setFormData({ ...formData, jobType: value })
            }
            items={[
              { label: "Full Time", value: "FULL_TIME" },
              { label: "Part Time", value: "PART_TIME" },
              { label: "Contract", value: "CONTRACT" },
              { label: "Freelance", value: "FREELANCE" },
            ]}
            style={pickerSelectStyles}
            placeholder={{ label: "Select job type...", value: null }}
          />

          <Text style={styles.label}>Location *</Text>
          <TextInput
            style={styles.input}
            value={formData.location}
            onChangeText={(text) =>
              setFormData({ ...formData, location: text })
            }
          />

          {renderDropdown("Skills", skillsOptions, "skills")}

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            <Text style={styles.submitButtonText}>Create</Text>
          </TouchableOpacity>

          {isLoading && <ActivityIndicator style={{ marginTop: 10 }} />}
          <Toast />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    paddingBottom: 60,
  },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  label: { fontWeight: "bold", marginTop: 12, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  textarea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    minHeight: 80,
    textAlignVertical: "top",
    marginBottom: 10,
  },
  dropdownWrapper: { marginTop: 12 },
  dropdownInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
  },
  selectedItemsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  selectedItemText: {
    backgroundColor: "#eee",
    margin: 2,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  placeholderText: { color: "#888" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    maxHeight: "80%",
  },
  modalScrollContent: {
    paddingBottom: 20,
  },
  optionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  optionSelected: {
    backgroundColor: "#c0c0c0",
  },
  modalCloseButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f47920",
    borderRadius: 6,
    alignItems: "center",
  },
  modalCloseText: {
    color: "white",
    fontWeight: "bold",
  },
  dateButton: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
    alignItems: "center",
  },
  dateButtonText: {
    color: "#f47920",
    fontWeight: "bold",
  },

  submitButton: {
    backgroundColor: "#f47920",
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    color: "black",
    paddingRight: 30,
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    color: "black",
    paddingRight: 30,
    marginBottom: 10,
  },
};

export default CreateJobPost;
