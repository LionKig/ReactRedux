import React from 'react';
import { connect } from 'react-redux';
import { loadCourses } from '../../redux/actions/courseAction';
import { loadAuthors } from '../../redux/actions/authorAction';
import PropTypes from 'prop-types';
import { useEffect } from 'react';


const ManageCoursePage = ({ courses, authors, loadAuthors, loadCourses }) => {
    useEffect(() => {
        if (courses.length === 0) {
            loadCourses().catch(error => {
                alert("Data Courses is faied" + error);
            });
        }
        if (authors.length === 0) {
            loadAuthors().catch(error => {
                alert("Data Author is faied" + error);
            });
        }
    }, []);

    return (
        <>
            <h2>Manage Course</h2>
        </>
    );

}

ManageCoursePage.propTypes = {
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired
};


function mapStateToProps(state) {
    return {
        courses: state.courses,
        authors: state.authors,
    }
}

const mapDispatchToProps = {
    loadCourses, loadAuthors
};


export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);