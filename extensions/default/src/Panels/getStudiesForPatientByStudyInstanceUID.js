async function getStudiesForPatientByStudyInstanceUID(
  dataSource,
  StudyInstanceUID
) {
  // TODO: The `dicomMetadataStore` should short-circuit both of these requests
  // Data _could_ be here from route query, or if using JSON data source
  // We could also force this to "await" these values being available in the DICOMStore?
  // Kind of like promise fulfillment in cornerstone-wado-image-loader when there are multiple
  // outgoing requests for the same data
  const getStudyResult = await dataSource.query.studies.search({
    studyInstanceUid: StudyInstanceUID,
  });

  // TODO: To Erik's point, the data source likely shouldn't deviate from
  // Naturalized DICOM JSON when returning. It makes things like this awkward (mrn)
  if (getStudyResult && getStudyResult.length && getStudyResult[0].mrn) {
    return dataSource.query.studies.search({
      patientId: getStudyResult[0].mrn,
    });
  }
};

export default getStudiesForPatientByStudyInstanceUID;