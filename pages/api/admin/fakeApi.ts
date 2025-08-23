// fakeApi.ts
export async function fetchDashboardStats() {
  return {
    totalQueries: 50800,
    activeUsers: 23600,
    totalDataEntries: 756,
    avgResponseTime: 9,
    vectorDbStatus: "Healthy",
    avgRating: 39,
    avgRetrievalTime: 2.3,
  };
}

export async function fetchRecentFiles() {
  return [
    { id: 1, name: "StudyRef_01 set minima...", dateAdded: "07/15/2024" },
    { id: 2, name: "StudyRef_02 set minima...", dateAdded: "07/12/2024" },
    { id: 3, name: "StudyRef_03 set minima...", dateAdded: "07/09/2024" },
  ];
}

export async function fetchChartData() {
  return {
    sessions: [
      { date: "05/01", value: 400 },
      { date: "05/05", value: 800 },
      { date: "05/10", value: 600 },
      { date: "05/15", value: 1000 },
      { date: "05/20", value: 700 },
    ],
    users: [
      { date: "05/01", value: 20 },
      { date: "05/05", value: 40 },
      { date: "05/10", value: 35 },
      { date: "05/15", value: 50 },
      { date: "05/20", value: 30 },
    ],
  };
}


// // fakeApi.ts


// const BASE_URL = "https://jsonplaceholder.typicode.com"; // placeholder

// export async function fetchDashboardStats() {
//   const res = await fetch(`${BASE_URL}/dashboard-stats`);
//   if (!res.ok) throw new Error("Failed to fetch dashboard stats");
//   return res.json();
// }

// export async function fetchRecentFiles() {
//   const res = await fetch(`${BASE_URL}/recent-files`);
//   if (!res.ok) throw new Error("Failed to fetch recent files");
//   return res.json();
// }

// export async function fetchChartData() {
//   const res = await fetch(`${BASE_URL}/charts`);
//   if (!res.ok) throw new Error("Failed to fetch chart data");
//   return res.json();
// }
