<<<<<<< HEAD
/* eslint-disable react-hooks/rules-of-hooks */
import { Redirect } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
=======
import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Redirect } from "expo-router";
>>>>>>> f2e765d077a90e2afb2d87024ec5cdcb6749738b

export default function index() {
  const [loggedInUser, setloggedInUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscription = async () => {
      const token = SecureStore.getItem("accessToken");
      setloggedInUser(token ? true : false);
      setLoading(false);
    };
    subscription();
  }, []);

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <Redirect href={!loggedInUser ? "/(routes)/onboarding" : "/(tabs)"} />
      )}
    </>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> f2e765d077a90e2afb2d87024ec5cdcb6749738b
