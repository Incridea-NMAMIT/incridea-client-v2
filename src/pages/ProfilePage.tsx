import { useEffect, useState } from "react";
import {
  useMutation,
  useQuery,
  type QueryFunction,
  type MutationFunction,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  changePassword,
  fetchMe,
  requestPasswordReset,
  type ChangePasswordPayload,
  type ChangePasswordResponse,
  type MeResponse,
  type ResetPasswordRequestPayload,
  type ResetPasswordResponse,
} from "../api/auth";
import { useForm } from "react-hook-form";
import { showToast } from "../utils/toast";
import { Pencil } from "lucide-react";
import LiquidGlassCard from "../components/liquidglass/LiquidGlassCard";

function ProfilePage() {
  const navigate = useNavigate();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [editFullName, setEditFullName] = useState("");

  const toErrorMessage = (error: unknown, fallback: string) =>
    error instanceof Error ? error.message : fallback;

  const requestResetMutationFn: MutationFunction<
    ResetPasswordResponse,
    ResetPasswordRequestPayload
  > = (payload) =>
    (
      requestPasswordReset as (
        input: ResetPasswordRequestPayload
      ) => Promise<ResetPasswordResponse>
    )(payload);

  useEffect(() => {
    if (!token) {
      /*void navigate("/");*/
    }
  }, [token, navigate]);

  const profileQueryFn: QueryFunction<MeResponse> = () => {
    if (!token) {
      throw new Error("Unauthorized");
    }
    return fetchMe();
  };

  const profileQuery = useQuery<MeResponse>({
    queryKey: ["me", token],
    queryFn: profileQueryFn,
    enabled: Boolean(token),
  });

  const form = useForm<ChangePasswordPayload>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const changePasswordMutationFn: MutationFunction<
    ChangePasswordResponse,
    ChangePasswordPayload
  > = (payload) => {
    if (!token) {
      throw new Error("Unauthorized");
    }
    return changePassword(payload, token);
  };

  const changePasswordMutation = useMutation<
    ChangePasswordResponse,
    Error,
    ChangePasswordPayload
  >({
    mutationFn: changePasswordMutationFn,
    onSuccess: () => {
      form.reset();
      showToast("Password updated successfully", "success");
      setShowChangePassword(false);
    },
  });

  const requestResetMutation = useMutation<
    ResetPasswordResponse,
    unknown,
    ResetPasswordRequestPayload
  >({
    mutationFn: requestResetMutationFn,
    onSuccess: () => {
      showToast("Password reset link sent to your email", "info");
    },
    onError: (error) => {
      showToast(toErrorMessage(error, "Failed to send reset link."), "error");
    },
  });

  const onSubmit = form.handleSubmit((values) =>
    changePasswordMutation.mutate(values)
  );

  const user = profileQuery.data?.user;
  const userName = user?.name ?? user?.email ?? "User";
  const userEmail: string = user?.email ?? "";

  const handleResetRequest = () => {
    if (!userEmail) {
      return;
    }
    requestResetMutation.mutate({ email: userEmail });
  };

  const handleCloseModal = () => {
    setShowChangePassword(false);
    setShowPasswordForm(false);
    setShowEditProfile(false);
    setEditFullName("");
    form.reset();
  };

  return (
    <div
      className="fixed inset-0 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: "url('/temp_event_bg.png')" }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <section className="relative h-screen overflow-y-auto pt-32 md:pt-24 pb-12 flex flex-col items-center justify-start">
        {/* Profile Card */}
        <div className="w-full max-w-[95%] sm:max-w-[60%] mt-4">
          <div className="relative">
            <LiquidGlassCard className="p-4 md:p-6">
              {/* Edit Profile Button */}
              <button
                onClick={() => {
                  setEditFullName(userName);
                  setShowEditProfile(true);
                }}
                className="absolute top-4 right-4 z-20 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 hover:scale-110 group"
                title="Edit profile"
              >
                <Pencil className="w-4 h-4 md:w-5 md:h-5 text-slate-200 group-hover:text-white" />
                <span className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-slate-900/80 text-slate-100 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                  Edit profile
                </span>
              </button>
              <div className="flex flex-col md:flex-row items-center gap-0 md:gap-0">
                {/* Avatar Circle - Overlapping */}
                <div className="flex-shrink-0 md:-mr-20 z-10 -mb-12 md:mb-0">
                  <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center shadow-xl">
                    <span className="text-4xl md:text-6xl text-slate-800 font-semibold">
                      {userName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Profile Info & Buttons - Purple Glass Container */}
                <div className="flex-1 w-full md:pl-16">
                  <LiquidGlassCard
                    colorScheme="orange"
                    className="rounded-2xl min-h-48 flex items-center justify-center p-2 md:p-1.5 pt-4 md:pt-1.5"
                  >
                    <div className="space-y-3 md:space-y-4 w-full p-1 md:p-1.5">
                      {/* Email Address */}
                      <div className="text-center">
                        <p className="text-sm text-slate-300">
                          {userEmail || "No email"}
                        </p>
                      </div>

                      {/* Name */}
                      <div className="text-center">
                        <p className="text-2xl md:text-3xl font-semibold text-slate-50">
                          {userName}
                        </p>
                      </div>

                      {/* Email Address : has to be fixed using hardcoded values for now*/}
                      <div className="text-center">
                        <p className="text-sm text-slate-300">
                          {"No College Info"}
                        </p>
                      </div>

                      {/* Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                          className="p-1.5 md:p-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors duration-200 w-full sm:w-60"
                          type="button"
                          onClick={() => setShowChangePassword(true)}
                        >
                          Change password
                        </button>
                        <button
                          className="p-1.5 md:p-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors duration-200 w-full sm:w-60"
                          type="button"
                          onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/");
                          }}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </LiquidGlassCard>
                </div>
              </div>
            </LiquidGlassCard>
          </div>
        </div>

        {/* My Missions Section */}
        {/* TODO: Replace hardcoded missions with mapped events once signup events API is available. */}
        {/* Cards count should equal number of events user has signed up for. */}
        <div className="w-full max-w-[95%] sm:max-w-[70%] mt-12">
          <LiquidGlassCard className="p-6 md:p-8">
            {/* Header */}
            <div className="flex justify-center mb-8">
              <div className="inline-block px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/40 backdrop-blur-sm">
                <p className="text-sm font-semibold text-white-200">
                  My Missions
                </p>
              </div>
            </div>

            {/* Mission Cards Container */}
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-6 pb-4 flex-nowrap scroll-smooth whitespace-nowrap">
                {/* Hardcoded Mission Cards */}
                {[
                  {
                    title: "Hackathon 2026",
                    code: "HX7K2P9",
                    image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  },
                  {
                    title: "Code Sprint Championship",
                    code: "CS9M4L1",
                    image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                  },
                  {
                    title: "Web Dev Masters",
                    code: "WD2X8B5",
                    image: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                  },
                  {
                    title: "AI Innovation Summit",
                    code: "AI6P3K7",
                    image: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
                  },
                  {
                    title: "Design Bootcamp",
                    code: "DB1N9R4",
                    image: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                  },
                ].map((mission, index) => (
                  <LiquidGlassCard
                    key={index}
                    colorScheme="orange"
                    className="flex-none shrink-0 !w-49 !max-w-49 overflow-hidden p-3 flex flex-col"
                  >
                    {/* Mission Image/Poster */}
                    <div
                      className=" h-[120px] sm:h-[140px] md:h-[160px] bg-cover bg-center relative overflow-hidden rounded-lg flex-shrink-0"
                      style={{
                        backgroundImage: mission.image,
                        aspectRatio: "4 / 5",
                      }}
                    >
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>

                    {/* Mission Card Content */}
                    <div className="flex-1 flex flex-col p-2 space-y-2 overflow-hidden">
                      {/* Event Title */}
                      <div>
                        <h3 className="text-xs font-semibold text-slate-50 line-clamp-2">
                          {mission.title}
                        </h3>
                      </div>

                      {/* Participation Code */}
                      <div className="flex items-center justify-between bg-slate-900/40 rounded px-2 py-1.5">
                        <span className="text-xs text-slate-400">CODE:</span>
                        <span className="text-xs font-mono font-bold text-amber-300">
                          {mission.code}
                        </span>
                      </div>

                      {/* Action Button - anchored to bottom */}
                      <button
                        className="w-full py-2 px-2 rounded bg-orange-600/60 hover:bg-orange-600/80 text-slate-100 text-xs font-medium transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30 mt-auto"
                        onClick={() => {
                          navigator.clipboard.writeText(mission.code);
                          showToast(`Copied code: ${mission.code}`, "success");
                        }}
                      >
                        Copy Code
                      </button>
                    </div>
                  </LiquidGlassCard>
                ))}
              </div>
            </div>
          </LiquidGlassCard>
        </div>

        {showEditProfile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-1 md:p-1.5 backdrop-blur">
            <LiquidGlassCard
              className="
                !w-[92%] sm:!w-[70%] md:!w-[45%] lg:!w-[25%]
                !max-w-[92%] sm:!max-w-[70%] md:!max-w-[45%] lg:!max-w-[25%]
                flex-none space-y-4 p-6
              "
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="muted">Account</p>
                  <h3 className="text-lg font-semibold text-slate-50">
                    Edit profile
                  </h3>
                </div>
                <button
                  type="button"
                  className="text-sm text-slate-300 hover:text-sky-300"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="label" htmlFor="fullName">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    className="input"
                    value={editFullName}
                    onChange={(e) => setEditFullName(e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <button
                    className="button"
                    type="button"
                    onClick={() => {
                      if (editFullName.trim()) {
                        showToast("Profile updated successfully", "success");
                        handleCloseModal();
                      } else {
                        showToast("Full name cannot be empty", "error");
                      }
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="button secondary"
                    type="button"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </LiquidGlassCard>
          </div>
        )}

        {showChangePassword && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-1 md:p-1.5 backdrop-blur">
            <LiquidGlassCard
              className="
                !w-[92%] sm:!w-[70%] md:!w-[45%] lg:!w-[25%]
                !max-w-[92%] sm:!max-w-[70%] md:!max-w-[45%] lg:!max-w-[25%]
                flex-none space-y-4 p-6
              "
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="muted">Security</p>
                  <h3 className="text-lg font-semibold text-slate-50">
                    Change password
                  </h3>
                </div>
                <button
                  type="button"
                  className="text-sm text-slate-300 hover:text-sky-300"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>

              {!showPasswordForm ? (
                <div className="space-y-3">
                  <p className="text-sm text-slate-400">Choose an option:</p>
                  <button
                    className="w-full p-2 md:p-3 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-lg transition-colors duration-200"
                    type="button"
                    onClick={() => setShowPasswordForm(true)}
                  >
                    Change Password
                  </button>
                  <button
                    className="w-full p-2 md:p-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200"
                    type="button"
                    onClick={() => {
                      handleResetRequest();
                      handleCloseModal();
                    }}
                  >
                    Send Reset Link to Email
                  </button>
                </div>
              ) : (
                <form
                  className="space-y-4"
                  onSubmit={(event) => void onSubmit(event)}
                >
                  <div className="space-y-2">
                    <label className="label" htmlFor="currentPassword">
                      Current password
                    </label>
                    <input
                      id="currentPassword"
                      type="password"
                      className="input"
                      {...form.register("currentPassword", { required: true })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="label" htmlFor="newPassword">
                      New password
                    </label>
                    <input
                      id="newPassword"
                      type="password"
                      className="input"
                      {...form.register("newPassword", { required: true })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="label" htmlFor="confirmNewPassword">
                      Confirm new password
                    </label>
                    <input
                      id="confirmNewPassword"
                      type="password"
                      className="input"
                      {...form.register("confirmNewPassword", {
                        required: true,
                      })}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      className="button"
                      type="submit"
                      disabled={changePasswordMutation.isPending}
                    >
                      {changePasswordMutation.isPending
                        ? "Updating…"
                        : "Update password"}
                    </button>
                    <button
                      className="button secondary"
                      type="button"
                      onClick={handleCloseModal}
                      disabled={changePasswordMutation.isPending}
                    >
                      Cancel
                    </button>
                  </div>
                  {changePasswordMutation.isError && (
                    <p className="text-sm text-rose-300">
                      {changePasswordMutation.error instanceof Error
                        ? changePasswordMutation.error.message
                        : "Failed to update password."}
                    </p>
                  )}
                </form>
              )}
            </LiquidGlassCard>
          </div>
        )}
      </section>
    </div>
  );
}

export default ProfilePage;
