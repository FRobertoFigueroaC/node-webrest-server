

export const fileUpload = async ( file ) => {
  if ( !file ) throw new Error( 'No file selected.' );
  const cloudUrl = 'https://api.cloudinary.com/v1_1/robertofc-cursos/image/upload';
  const formData = new FormData();
  formData.append( 'upload_preset', 'react-journalApp' );
  formData.append( 'file', file );

  try {
    const resp = await fetch( cloudUrl, {
      method: 'POST',
      body: formData
    } );
    if ( !resp.ok ) throw new Error( 'There was an error when trying to upload the file.' );
    const cloudResp = await resp.json();

    return cloudResp.secure_url;

  } catch ( error ) {
    // throw new Error(error.message);
    return null;
  }

};