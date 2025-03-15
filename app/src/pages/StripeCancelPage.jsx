import { useNavigate } from "react-router-dom"

function StripeCancelPage() {
    const  navigate = useNavigate()

  return (
    <div>
      <h1>unable to process your payment</h1>
      <button
            onClick={() => navigate("/")}
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition duration-300"
          >
            Go Back to Home Page
          </button>
    </div>
    
  )
}

export default StripeCancelPage
