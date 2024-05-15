import React, { useState } from 'react'
import styles from './styles/form.module.css'
import { saveAs } from 'file-saver'

const EmployeeAgreement = () => {
  const [formData, setFormData] = useState({
    employeeName: '',
    companyName: '',
    jobTitle: '',
    startDate: '',
    endDate: '',
    salary: '',
    // Add more fields as needed
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
    const { employeeName, companyName, jobTitle, startDate, endDate, salary } =
      data
    const { jsPDF } = require('jspdf')
    const doc = new jsPDF()
    doc.setFontSize(24)
    doc.setFont('helvetica', 'bold')
    doc.text(`EMPLOYEE AGREEMENT`, 60, 20)

    doc.setFont('helvetica')
    doc.setFontSize(12)
    doc.text(`Employee Name: ${employeeName}`, 10, 40)
    doc.text(`Company Name: ${companyName}`, 10, 50)
    doc.text(`Job Title: ${jobTitle}`, 10, 60)
    doc.text(`Start Date: ${startDate}`, 10, 70)
    doc.text(`End Date: ${endDate}`, 10, 80)
    doc.text(`Salary: ${salary}`, 10, 90)
    // Add more fields as needed

    // Add other necessary text content
    doc.text(
      `An employment agreement, or contract, is a legally binding agreement between an employer and employee that defines the employee's rights and responsibilities during the employment period. Most written contracts include the following details:`,
      10,
      110
    )
    doc.text(
      `Job description: The job title and description, roles, responsibilities, and obligations`,
      10,
      120
    )
    doc.text(
      `Compensation: Salary, bonuses, equity, performance or signing bonuses, commissions, and incentive opportunities, health or other insurance benefits, stock options or profit-sharing plan eligibility, investment/retirement plan participation`,
      10,
      130
    )
    doc.text(
      `Work schedule: Working hours, annual leave, and other key terms`,
      10,
      140
    )
    doc.text(
      `Benefits: Time off, sick days, vacation, and other benefits`,
      10,
      150
    )
    doc.text(
      `Other details: Organization name, employment period, holidays, training, indemnity bond, reasons for termination, notice period, retirement/pension, provident fund and gratuity, overtime compensation, work from home policy, confidentiality terms, non-compete terms, non-solicitation terms, dispute resolution method/remedies like arbitration, and more`,
      10,
      160
    )

    doc.save('employee_agreement.pdf')
  }

  return (
    <>
      <div className={styles.main}>
        <h1 id={styles.main_head}>Employee Agreement Information</h1>
        {!showPreview ? ( // Render input fields if showPreview is false
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.page}>
              <h2 className={styles.center}>Employee Agreement</h2>
              <div>
                {/* Input fields */}
                <div className={styles.forms_data}>
                  Employee Name:{' '}
                  <input
                    className={styles.input}
                    type="text"
                    name="employeeName"
                    placeholder="Enter Employee Name"
                    value={formData.employeeName}
                    onChange={handleChange}
                  />
                  <br />
                  Company Name:{' '}
                  <input
                    className={styles.input}
                    type="text"
                    name="companyName"
                    placeholder="Enter Company Name"
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                  <br />
                  Job Title:{' '}
                  <input
                    className={styles.input}
                    type="text"
                    name="jobTitle"
                    placeholder="Enter Job Title"
                    value={formData.jobTitle}
                    onChange={handleChange}
                  />
                  <br />
                  Start Date:{' '}
                  <input
                    className={styles.input}
                    type="text"
                    name="startDate"
                    placeholder="Enter Start Date"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                  <br />
                  End Date:{' '}
                  <input
                    className={styles.input}
                    type="text"
                    name="endDate"
                    placeholder="Enter End Date"
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                  <br />
                  Salary:{' '}
                  <input
                    className={styles.input}
                    type="text"
                    name="salary"
                    placeholder="Enter Salary"
                    value={formData.salary}
                    onChange={handleChange}
                  />
                  <br />
                  {/* Add more input fields for other information */}
                </div>
              </div>
              <br />
            </div>
            <button className={styles.text_white} type="submit">
              Generate Preview
            </button>
          </form>
        ) : (
          // Render preview if showPreview is true
          <div className={styles.form}>
            <div className={styles.page}>
              <h2 className={styles.center}>Employee Agreement</h2>
              <div className={styles.forms_data}>
                <p>
                  Employee Name: {formData.employeeName} <br />
                  Company Name: {formData.companyName} <br />
                  Job Title: {formData.jobTitle} <br />
                  Start Date: {formData.startDate} <br />
                  End Date: {formData.endDate} <br />
                  Salary: {formData.salary} <br />
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
      </div>
    </>
  )
}

export default EmployeeAgreement
