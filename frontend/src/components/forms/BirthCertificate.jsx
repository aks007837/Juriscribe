import React, { useState } from 'react'
import styles from './styles/form.module.css'
import { saveAs } from 'file-saver'

const BirthCertificate = () => {
  const [formData, setFormData] = useState({
    localArea: '',
    tahsil: '',
    district: '',
    state: '',
    name: '',
    sex: '',
    dob: '',
    placeOfBirth: '',
    motherName: '',
    fatherName: '',
    parentAddress: '',
    permanentAddress: '',
  })
  const [showPreview, setShowPreview] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowPreview(true) // Show the preview after submitting the form
  }

  const handleSavePDF = () => {
    // Generate PDF
    generatePDF(formData)
  }

  const generatePDF = (data) => {
    // Code to generate PDF using the entered data
    // This example uses a library like jsPDF to generate PDF
    // Here is a basic example:
    const {
      localArea,
      tahsil,
      district,
      state,
      name,
      sex,
      dob,
      placeOfBirth,
      motherName,
      fatherName,
      parentAddress,
      permanentAddress,
    } = data
    const { jsPDF } = require('jspdf')
    const doc = new jsPDF()
    doc.setFontSize(24)
    // doc.setFontStyle('italic')
    doc.setFont('helvetica', 'bold')
    doc.text(`BIRTH CERTIFICATE`, 60, 20)

    doc.setFont('helvetica')
    doc.setFontSize(12)
    const longtext = `This is to certify that the following information has been taken from the original record of birth which is the register for (local area / local body):${localArea} of tahsil / block : ${tahsil} of district : ${district} of state / UT : ${state}.`
    const maxWidth = doc.internal.pageSize.getWidth() - 2 * 10 // Subtracting the left and right margins (10 units each)

    // Draw the long text with automatic word wrapping
    doc.text(longtext, 10, 30, { maxWidth })
    doc.text(`Name: ${name}`, 10, 50)
    doc.text(`Sex: ${sex}`, 100, 50)
    doc.text(`Date of Birth: ${dob}`, 10, 55)
    doc.text(`Place of Birth: ${placeOfBirth}`, 100, 55)
    doc.text(`Name of Mother: ${motherName}`, 10, 60)
    doc.text(`Name of Father: ${fatherName}`, 100, 60)
    doc.text(
      `Address of the Parent at the Time of Birth: ${parentAddress}`,
      10,
      70
    )
    doc.text(`Permanent Address of Parents: ${permanentAddress}`, 10, 80)
    const startX = 10 // Start X-coordinate
    const endX = doc.internal.pageSize.getWidth() - 10 // End X-coordinate (page width minus right margin)
    let y = 90 // Y-coordinate where you want to draw the line
    // Draw the horizontal line
    doc.line(startX, y, endX, y)
    doc.text(
      `**This is a computer-generated document and requires signature`,
      10,
      100
    )
    doc.text(`Registration No. : `, 10, 110)
    doc.text(`Date of Registration :`, 10, 120)
    doc.text(`Remarks (id any) :`, 10, 130)
    doc.text(`Date of Issue:`, 10, 140)
    doc.text(`Signature of issueing authority`, 110, 140)
    doc.text(`Address of the issuing authority`, 110, 160)
    doc.text(`**Please do not write anything after this line`, 10, 180)
    y = 190
    doc.line(startX, y, endX, y)

    doc.save('birth_certificate.pdf')
  }

  return (
    <>
      <div className={styles.main}>
        <h1 id={styles.main_head}>Birth Certificate Information</h1>
        {!showPreview ? ( // Render input fields if showPreview is false
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.page}>
              <h2 className={styles.center}>जन्म प्रमाण - पत्र</h2>
              <h2 className={styles.center}>BIRTH CERTIFICATE</h2>
              <div>
                {/* Input fields */}
                <div className={styles.forms_data}>
                  This is to certify that the following information has been
                  taken from the original record of birth which is the register
                  for (local area/ local body) :{' '}
                  <input
                    className={styles.input}
                    type="text"
                    name="localArea"
                    placeholder="Enter Local area / Local body"
                    value={formData.localArea}
                    onChange={handleChange}
                  />
                  of tahsil / block:{' '}
                  <input
                    className={styles.input}
                    type="text"
                    name="tahsil"
                    placeholder="Enter tahsil / block"
                    value={formData.tahsil}
                    onChange={handleChange}
                  />
                  of District:{' '}
                  <input
                    className={styles.input}
                    type="text"
                    name="district"
                    placeholder="Enter District"
                    value={formData.district}
                    onChange={handleChange}
                  />
                  of state / UT:{' '}
                  <input
                    className={styles.input}
                    type="text"
                    name="state"
                    placeholder="Enter State/UT"
                    value={formData.state}
                    onChange={handleChange}
                  />
                  <br />
                </div>
                <br />
                <div className={styles.forms_data}>
                  <span>
                    Name:{' '}
                    <input
                      className={styles.input}
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </span>
                  <span>
                    Sex:{' '}
                    <input
                      className={styles.input}
                      type="text"
                      name="sex"
                      placeholder="Sex"
                      value={formData.sex}
                      onChange={handleChange}
                    />
                  </span>
                  <br />
                  <span>
                    Date of Birth:{' '}
                    <input
                      className={styles.input}
                      type="text"
                      name="dob"
                      placeholder="Enter DOB"
                      value={formData.dob}
                      onChange={handleChange}
                    />
                  </span>
                  <span>
                    Place of Birth:{' '}
                    <input
                      className={styles.input}
                      type="text"
                      name="placeOfBirth"
                      placeholder="Enter Place of Birth"
                      value={formData.placeOfBirth}
                      onChange={handleChange}
                    />
                  </span>
                  <br />
                  <span>
                    Name of Mother:{' '}
                    <input
                      className={styles.input}
                      type="text"
                      name="motherName"
                      placeholder="Enter Mother Name"
                      value={formData.motherName}
                      onChange={handleChange}
                    />
                  </span>
                  <span>
                    Name of Father:{' '}
                    <input
                      className={styles.input}
                      type="text"
                      name="fatherName"
                      placeholder="Enter Father Name"
                      value={formData.fatherName}
                      onChange={handleChange}
                    />
                  </span>
                </div>
                {/* Add more input fields for other information */}
              </div>
              <br />
              <div className={styles.lower_box}>
                <div className={styles.left_box}>
                  Address of Parents at the time of birth of child:{' '}
                  <textarea
                    className={styles.textarea}
                    name="parentAddress"
                    id=""
                    cols="30"
                    rows="4"
                    placeholder="Enter Address"
                    value={formData.parentAddress}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className={styles.right_box}>
                  Permanent Address of Parents
                  <textarea
                    value={formData.permanentAddress}
                    onChange={handleChange}
                    className={styles.textarea}
                    name="permanentAddress"
                    id=""
                    cols="30"
                    rows="4"
                    placeholder="Enter Permanent Address"
                  ></textarea>
                </div>
              </div>
            </div>
            <button className={styles.text_white} type="submit">
              Generate Preview
            </button>
          </form>
        ) : (
          // Render preview if showPreview is true
          <div className={styles.form}>
            <div className={styles.page}>
              <h2 className={styles.center}>जन्म प्रमाण - पत्र</h2>
              <h2 className={styles.center}>BIRTH CERTIFICATE</h2>
              <div className={styles.forms_data}>
                <p>
                  This is to certify that the following information has been
                  taken from the original record of birth which is the register
                  for <strong>(local area / local body):</strong>
                  {formData.localArea} of <strong>tahsil / block : </strong>
                  {formData.tahsil} of
                  <strong>district : </strong>
                  {formData.district} of <strong>state / UT : </strong>
                  {formData.state}.
                  <br />
                  <strong>Name : </strong> {formData.name} <br />
                  <strong>Sex : </strong> {formData.sex} <br />
                  <strong>Date of Birth : </strong> {formData.dob} <br />
                  <strong>Place of Birth : </strong> {formData.placeOfBirth}{' '}
                  <br />
                  <strong>Name of Mother : </strong> {formData.motherName}{' '}
                  <br />
                  <strong>Name of Father : </strong> {formData.fatherName}{' '}
                  <br />
                  <strong>
                    Address of Parents at the time of birth of child :{' '}
                  </strong>
                  <br />
                  {formData.parentAddress}
                  <br />
                  <strong>Permanent Address of Parents : </strong>
                  <br />
                  {formData.permanentAddress}
                  <br />
                  {/* Display other entered values */}
                </p>
              </div>
            </div>
          </div>
        )}
        {showPreview && (
          <button className={styles.text_white} onClick={handleSavePDF}>
            Save as PDF
          </button>
        )}
        {/* <div className={styles.signatureBox}></div>{' '} */}
        {/* Signature box at right */}
      </div>
    </>
  )
}

export default BirthCertificate
