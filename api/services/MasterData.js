module.exports = {
  createDoctorProfession: async function () {
    const doctorProfessions = [
      {
        name: "Allergists/Immunologists",
      },
      {
        name: "Anesthesiologists",
      },
      {
        name: "Cardiologists",
      },
      {
        name: "Colon and Rectal Surgeons",
      },
      {
        name: "Critical Care Medicine Specialists",
      },
      {
        name: "Dermatologists",
      },
      {
        name: "Endocrinologists",
      },
      {
        name: "Emergency Medicine Specialists",
      },
      {
        name: "Family Physicians",
      },
      {
        name: "Gastroenterologists",
      },
      {
        name: "Internists",
      },
      {
        name: "Others",
      },
    ];
    await DoctorProfession.createEach(doctorProfessions);
  },
  createAvailableTiming: async function () {
    const availableTimings = [
      {
        name: "12:00AM - 01:00AM",
      },
      {
        name: "01:00AM - 02:00AM",
      },
      {
        name: "02:00AM - 03:00AM",
      },
      {
        name: "03:00AM - 04:00AM",
      },
      {
        name: "04:00AM - 05:00AM",
      },
      {
        name: "05:00AM - 06:00AM",
      },
      {
        name: "06:00AM - 07:00AM",
      },
      {
        name: "07:00AM - 08:00AM",
      },
      {
        name: "08:00AM - 09:00AM",
      },
      {
        name: "09:00AM - 10:00AM",
      },
      {
        name: "10:00AM - 11:00AM",
      },
      {
        name: "11:00AM - 12:00PM",
      },
      {
        name: "12:00PM - 01:00PM",
      },
      {
        name: "01:00PM - 02:00PM",
      },
      {
        name: "02:00PM - 03:00PM",
      },
      {
        name: "03:00PM - 04:00PM",
      },
      {
        name: "04:00PM - 05:00PM",
      },
      {
        name: "05:00PM - 06:00PM",
      },
      {
        name: "06:00PM - 07:00PM",
      },
      {
        name: "07:00PM - 08:00PM",
      },
      {
        name: "08:00PM - 09:00PM",
      },
      {
        name: "09:00PM - 10:00PM",
      },
      {
        name: "10:00PM - 11:00PM",
      },
      {
        name: "11:00PM - 12:00PM",
      },
    ];
    await AvailableTiming.createEach(availableTimings);
  },
};
