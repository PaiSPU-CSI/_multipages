import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <h2>
        <span className="badge bg-dark">CSI205 Profile</span>
      </h2>
      <div className="home-content-container">
        <div>
          <img
            src="../../../public/self-pic.jpg"
            alt=""
            style={{ width: "200px", borderRadius: "10px" }}
          />
        </div>
        <div
          style={{
            textAlign: "left",
            width: "300px",
            border: "1px solid black",
            borderRadius: "10px",
            padding: "1rem",
          }}
        >
          <p>
            Panas Loudtragulngam
            <br />
            Skill: Basic HTML,CSS,Javascript,React
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
