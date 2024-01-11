/**
 * DoctorAvailableTiming.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "doctor_available_timing",
  attributes: {
    doctorId: {
      columnName: "doctor_id",
      model: "Doctor",
    },
    availableTimingId: {
      columnName: "available_timing_id",
      model: "AvailableTiming",
    },
  },
  toDao: (values) => {
    const data = {
      doctorId: values.doctorId,
      availableTimingId: values.availableTimingId,
    };
    Object.keys(data).forEach(
      (key) => data[key] === undefined && delete data[key]
    );
    return data;
  },
  toDto: (values) => {
    const data = {
      doctorId: values.doctorId,
      availableTimingId: values.availableTimingId,
    };
    Object.keys(data).forEach(
      (key) => data[key] === undefined && delete data[key]
    );
    return data;
  },
  toDoctorTimingPatientDto: (values) => {
    const data = {
      ...values.availableTimingId,
    };
    Object.keys(data).forEach(
      (key) => data[key] === undefined && delete data[key]
    );
    return data;
  },
  toDoctorTimingPatientDtoList: (list) =>
    list.map((dto) => DoctorAvailableTiming.toDoctorTimingPatientDto(dto)),
};
