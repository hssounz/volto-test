import React from "react";
import Image from "next/image";
import defaultAvatar from "../public/default-avatar.png";

const UserDetails = ({ user }) => {
  return (
    <div className="user-details">
      <Image src={defaultAvatar} width={60} alt="Default avatar.." />
      <div>
        <p className="user-inf">
          <span>Utilisateur : </span>
          {user.first_name} {user.last_name}
        </p>
        <hr />
        <p className="user-inf">
          <span>Email : </span>
          {user.email}
        </p>
      </div>
    </div>
  );
};

export default UserDetails;
