import html2pdf from 'html2pdf-fix-jspdf'

export default (context, inject) => {
  // Create an anonymous credential

  inject('html2pdf', html2pdf)
}
