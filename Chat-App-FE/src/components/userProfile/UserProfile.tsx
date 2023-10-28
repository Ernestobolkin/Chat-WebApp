import useAuthStore from "../../stores/authStore";

function UserProfile() {
  const { isSignedIn, signIn, signOut } = useAuthStore();

  return (
    <div>
      {isSignedIn ? (
        <div>
          <div className="circle-icon">User Icon</div>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={signIn}>Sign In</button>
      )}
    </div>
  );
}

export default UserProfile;