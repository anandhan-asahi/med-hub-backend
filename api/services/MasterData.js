module.exports = {
  createDoctorProffession: async function () {
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
};
