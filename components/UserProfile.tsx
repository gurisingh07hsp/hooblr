// components/UserProfile.tsx
"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import axios from "axios";
import { Eye, FileText, X } from "lucide-react";

interface UserProfileData {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  skills: string[];
  experience: string;
  education: string;
  resume?: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const UserProfile = () => {
  const { user, setUser } = useUser();
  const [activeSection, setActiveSection] = useState("personal");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showResumeField, setShowResumeField] = useState(false);

  const [profileData, setProfileData] = useState<UserProfileData>({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    skills: [],
    experience: "",
    education: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.profile?.name || "",
        email: user.email || "",
        phone: user.profile?.phone || "",
        location: user.profile?.location || "",
        bio: user.profile?.bio || "",
        skills: user.profile?.skills || [],
        experience: user.profile?.experience || "",
        education: user.profile?.education || "",
        resume: user.profile?.resume,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
    if (user?.profile?.resume) {
      setShowResumeField(true);
    }
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);
    setProfileData((prev) => ({ ...prev, skills }));
  };

  const handlePersonalInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const formData = new FormData();

    // Always create formData and append profile data as JSON string
    formData.append(
      "profile",
      JSON.stringify({
        name: profileData.name,
        phone: profileData.phone,
        location: profileData.location,
        bio: profileData.bio,
        skills: profileData.skills,
        experience: profileData.experience,
        education: profileData.education,
      })
    );

    // Append resume file if it exists
    if (resume) {
      formData.append("resume", resume);
    }
    console.log(formData);

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/profile`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status == 200) {
        setUser(response.data.user);
        setMessage("Profile updated successfully!");
      } else {
        const errorData = await response.data;
        setMessage(errorData.message || "Failed to update profile");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        setMessage(
          error.response?.data?.message ||
            "An error occurred while updating profile"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (profileData.newPassword !== profileData.confirmPassword) {
      setMessage("New passwords do not match");
      setLoading(false);
      return;
    }

    if (profileData.newPassword.length < 6) {
      setMessage("New password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/change-password`,
        {
          currentPassword: profileData.currentPassword,
          newPassword: profileData.newPassword,
        },
        { withCredentials: true }
      );

      if (response.status == 200) {
        setMessage("Password updated successfully!");
        setProfileData((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
      } else {
        const errorData = await response.data;
        setMessage(errorData.message || "Failed to update password");
      }
    } catch (error) {
      setMessage("An error occurred while updating password");
    } finally {
      setLoading(false);
    }
  };

  const sections = [
    { id: "personal", name: "Personal Information" },
    { id: "security", name: "Security" },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-600">
          Manage your account information and security settings.
        </p>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.includes("successfully")
              ? "bg-green-100 text-green-700 border border-green-200"
              : "bg-red-100 text-red-700 border border-red-200"
          }`}
        >
          {message}
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeSection === section.id
                    ? "border-[#6D47F1] text-[#6D47F1]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {section.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeSection === "personal" && (
            <form onSubmit={handlePersonalInfoSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6D47F1] focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={profileData.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6D47F1] focus:border-transparent"
                    placeholder="e.g., New York, NY"
                  />
                </div>

                <div className="w-[100%]">
                  {!showResumeField ? (
                    <div>
                      <label
                        htmlFor="location"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Upload Resume
                      </label>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setResume(e.target.files?.[0] || null)}
                        className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6D47F1] focus:border-transparent"
                      />
                      <span className="text-[12px] text-gray-600">
                        DOC, DOCX and PDF (2 MB)
                      </span>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-[#6D47F1] transition-colors">
                      <div>
                        <div className="flex gap-2">
                          <div className="bg-blue-100 hidden h-8 lg:h-12 lg:w-12 lg:flex justify-center items-center lg:p-4 p-2 rounded-full mb-3">
                            <FileText className="lg:w-6 lg:h-6 w-4 h-4 text-[#6D47F1]" />
                          </div>

                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">
                              {user?.profile?.resume?.split('/').pop()?.slice(14)}
                            </p>
                            <div className="flex gap-3">
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  setShowModal(true);
                                }}
                                className="flex items-center gap-2 px-4 py-2 bg-[#6D47F1] text-white rounded-lg transition-colors text-sm font-medium"
                              >
                                <Eye className="w-4 h-4" />
                                View
                              </button>

                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  setShowResumeField(false);
                                }}
                                className="flex items-center gap-2 lg:px-4 px-2 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                              >
                                Change Resume
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="flex-1 overflow-hidden">
              <iframe
                src={profileData.resume}
                className="w-full h-full"
                title="Resume Preview"
              />
            </div> */}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  value={profileData.bio}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6D47F1] focus:border-transparent"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div>
                <label
                  htmlFor="skills"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Skills
                </label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value={profileData.skills.join(", ")}
                  onChange={handleSkillsChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6D47F1] focus:border-transparent"
                  placeholder="e.g., JavaScript, React, Node.js (separate with commas)"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="experience"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Experience Level
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    value={profileData.experience}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select experience level</option>
                    <option value="Entry-level">Entry Level</option>
                    <option value="Mid-level">Mid Level</option>
                    <option value="Senior-level">Senior Level</option>
                    <option value="Executive">Executive</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="education"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Education
                  </label>
                  <select
                    id="education"
                    name="education"
                    value={profileData.education}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6D47F1] focus:border-transparent"
                  >
                    <option value="">Select education level</option>
                    <option value="high-school">High School</option>
                    <option value="associate">Associate Degree</option>
                    <option value="bachelor">Bachelor&apos;s Degree</option>
                    <option value="master">Master&apos;s Degree</option>
                    <option value="phd">PhD</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-[#6D47F1] text-white font-medium rounded-lg focus:outline-none focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          )}

          {activeSection === "security" && (
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div className="max-w-md">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Change Password
                </h3>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="currentPassword"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={profileData.currentPassword}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6D47F1] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={profileData.newPassword}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6D47F1] focus:border-transparent"
                      minLength={6}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={profileData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6D47F1] focus:border-transparent"
                      minLength={6}
                      required
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-[#6D47F1] text-white font-medium rounded-lg focus:outline-none focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">
                Resume Preview
              </h3>
              <div className="flex items-center gap-2">
                {/* <button
                  onClick={(e)=>{e.preventDefault(); handleDownload}}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button> */}
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 overflow-hidden">
              <iframe
                src={profileData.resume}
                className="w-full h-full"
                title="Resume Preview"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;

// export default UserProfile; border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={profileData.email}
//                     disabled
//                     className="w-full px-3 py-2 border
