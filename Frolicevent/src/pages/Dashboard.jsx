import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Button from "../components/common/Button";

export default function Dashboard() {
  const stats = [
    { title: "Institutes", value: 5 },
    { title: "Departments", value: 12 },
    { title: "Events", value: 8 },
    { title: "Participants", value: 120 },
  ];

  const upcomingEvents = [
    { name: "Tech Conference", date: "2026-05-01", location: "New York" },
    { name: "Business Meetup", date: "2026-05-15", location: "California" },
    { name: "Science Expo", date: "2026-06-05", location: "Texas" },
  ];

  return (
    <div className="flex min-h-screen bg-linear-to-b from-purple-50 via-pink-50 to-teal-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-white/30 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300"
            >
              <h2 className="text-lg font-semibold text-purple-700">{stat.title}</h2>
              <p className="text-3xl font-bold text-pink-500 mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="m-7 bg-white/30 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-white/20 mt-6 transition-all duration-500 hover:shadow-2xl">
          <h2 className="text-purple-700 font-bold text-2xl mb-4">Upcoming Events</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/20">
                <th className="py-2 px-4 text-purple-700 font-semibold">Event</th>
                <th className="py-2 px-4 text-purple-700 font-semibold">Date</th>
                <th className="py-2 px-4 text-purple-700 font-semibold">Location</th>
              </tr>
            </thead>
            <tbody>
              {upcomingEvents.map((event, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-purple-200/30 transition-all duration-300 rounded-xl"
                >
                  <td className="py-2 px-4">{event.name}</td>
                  <td className="py-2 px-4">{event.date}</td>
                  <td className="py-2 px-4">{event.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

       
      </div>
    </div>
  );
}