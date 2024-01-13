/**
 * DoctorAppointment.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {
  tableName: "doctor_appointment",
  attributes: {
    doctorId: {
      columnName: "doctor_id",
      model: "Doctor",
    },
    patientId: {
      columnName: "patient_id",
      model: "Patient",
    },
    availableTimingId: {
      columnName: "available_timing_id",
      model: "AvailableTiming",
    },
    appointmentStartTime: {
      columnName: "appointment_start_time",
      type: "ref",
      columnType: "datetime",
    },
    appointmentEndTime: {
      columnName: "appointment_end_time",
      type: "ref",
      columnType: "datetime",
    },
    deleted: {
      columnName: "deleted",
      type: "boolean",
      defaultsTo: false,
    },
  },
  toDao: (values) => {
    const data = {
      doctorId: values.doctorId,
      patientId: values.patientId,
      availableTimingId: values.availableTimingId,
      appointmentStartTime: values.appointmentStartTime,
      appointmentEndTime: values.appointmentEndTime,
    };
    Object.keys(data).forEach(
      (key) => data[key] === undefined && delete data[key]
    );
    return data;
  },
  toDto: (values) => {
    const data = {
      id: values.id,
      doctorId: values.doctorId,
      patientId: values.patientId,
      availableTimingId: values.availableTimingId,
      appointmentStartTime: values.appointmentStartTime,
      appointmentEndTime: values.appointmentEndTime,
    };
    Object.keys(data).forEach(
      (key) => data[key] === undefined && delete data[key]
    );
    return data;
  },
  toPatientBookingDto: (values) => {
    const data = {
      id: values.id,
      doctorId: {
        id: values.doctorId.id,
        name: values.doctorId.firstName + " " + values.doctorId.firstName,
        email: values.doctorId.email,
      },
      appointmentStartTime: values.appointmentStartTime,
      appointmentEndTime: values.appointmentEndTime,
    };
    Object.keys(data).forEach(
      (key) => data[key] === undefined && delete data[key]
    );
    return data;
  },
  toDoctorAppointmentDto: (values) => {
    const data = {
      id: values.id,
      patientId: {
        id: values.patientId.id,
        name: values.patientId.firstName + " " + values.patientId.firstName,
        email: values.patientId.email,
        age: values.patientId.age,
      },
      appointmentStartTime: values.appointmentStartTime,
      appointmentEndTime: values.appointmentEndTime,
    };
    Object.keys(data).forEach(
      (key) => data[key] === undefined && delete data[key]
    );
    return data;
  },
  toDtoList: (list) => list.map((dto) => DoctorAppointment.toDto(dto)),
  toPatientBookingDtoList: (list) =>
    list.map((dto) => DoctorAppointment.toPatientBookingDto(dto)),
  toDoctorAppointmentDtoList: (list) =>
    list.map((dto) => DoctorAppointment.toDoctorAppointmentDto(dto)),
};
