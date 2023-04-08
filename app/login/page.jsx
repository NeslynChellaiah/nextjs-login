"use client";
import { useState } from "react";
import "./login.css";
import { useRouter } from "next/navigation";

export default function Login() {
  const skills = ["UI/UX", "Product Design", "Motion Graphics"];
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isCredentialsWrong, setIsCredentialsWrong] = useState(false);
  const router = useRouter();

  const login = async (e) => {
    e?.preventDefault();

    await fetch("https://frontendtestapi.staging.fastjobs.io/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.message !== "success") {
          setIsCredentialsWrong(true);
          setTimeout(() => setIsCredentialsWrong(false), 3000);
          return;
        }
        router.push("/");
        setIsCredentialsWrong(false);
      });
  };

  return (
    <section className="row">
      <div className="banner min-vh-100 d-none d-sm-block col-sm-8 position-relative">
        <div className="banner-content position-absolute text-light">
          <h1>Fastjobs.io</h1>
          <div className="banner-content-description">
            <h6>congratulations!</h6>
            <h3 className="banner-content-description-bold">
              Company XYZ is inviting you to take an interview
            </h3>
            <h6>Skill beign asseed:</h6>
            <div className="skills">
              {skills.map((skill) => {
                return (
                  <span key={skill} className="skill-badge">
                    {skill}
                  </span>
                );
              })}
            </div>
            <h6>Don't be nervous.</h6>
          </div>
        </div>
        <div className="circle d-inline-block rounded-circle circle-1 position-absolute d-flex align-items-center justify-content-center">
          <div className="circle circle-2 rounded-circle d-flex align-items-center justify-content-center">
            <div className="circle circle-3 rounded-circle"></div>
          </div>
        </div>
      </div>
      <div className="form-container min-vh-100 col-sm-4 col-xs-12 d-flex flex-column justify-content-center align-items-center position-relative">
        {isCredentialsWrong && (
          <div
            onClick={() => setIsCredentialsWrong(false)}
            className="position-absolute text-light d-inline-block small-toast row"
          >
            <small>Wrong login credentials please try again</small>
          </div>
        )}

        <h1 className="text-light d-sm-none company-name">Fastjobs.io</h1>
        <h3 className="text-light">For us to stay in touch</h3>
        <form onSubmit={login}>
          <div className="form-group">
            <label className="text-secondary" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="form-control bg-transparent text-light"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="text-secondary" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control bg-transparent text-light"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn text-light submit-btn"
            disabled={!username.trim().length || !password.length}
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
