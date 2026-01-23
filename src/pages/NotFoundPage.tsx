import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Jersey+10&display=swap');
          
          .jersey-10-regular {
            font-family: "Jersey 10", sans-serif;
            font-weight: 400;
            font-style: normal;
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0);
            }
            25% {
              transform: translateY(15px);
            }
            50% {
              transform: translateY(-15px);
            }
            75% {
              transform: translateY(10px);
            }
          }

          .floating-image {
            animation: float 6s ease-in-out infinite;
          }

          .floating-text {
            animation: float 8s ease-in-out infinite;
          }
        `}
      </style>
      <section
        className="relative flex items-center justify-center min-h-screen w-full overflow-hidden"
        style={{
          backgroundImage: "url(/notfound/bg1.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Content Container */}
        <div className="relative z-10 flex items-center justify-center gap-12 px-6">
          {/* Image Section */}
          <div className="flex-shrink-0 floating-image">
            <img
              src="/notfound/image1.png"
              alt="404"
              className="max-w-sm md:max-w-md"
            />
          </div>

          {/* Text Section */}
          <div className="text-center flex flex-col items-center floating-text">
            <h1
              className="text-7xl md:text-8xl font-bold mb-4 jersey-10-regular"
              style={{
                color: "#ffffff",
                letterSpacing: "0.05em",
              }}
            >
              404 Not Found
            </h1>
            <p
              className="text-lg md:text-3xl mb-8 leading-relaxed max-w-md jersey-10-regular"
              style={{
                color: "#ffffff",
              }}
            >
              Access denied: Ryouko sealed the rift,
              <br />
              the untold regions are too dangerous.
            </p>
            <Link
              to="/"
              className="px-16 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-4xl transition jersey-10-regular text-xl"
            >
              Go Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default NotFoundPage;
