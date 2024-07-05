import PropTypes from 'prop-types'

function Section({ children, title }) {
  return (
    <section className="padding-inline">
      <h2 className="title2 mb-6 mt-16">{title}</h2>
      <div className="grid gap-x-3 gap-y-5 sm:gap-4 grid-cols-[repeat(auto-fit,minmax(130px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
        {children}
      </div>
    </section>
  )
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Section