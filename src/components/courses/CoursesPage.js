import React from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseAction';
import * as authorActions from '../../redux/actions/authorAction';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import CourseList from './CourseList';

class CoursePage extends React.Component {
    componentDidMount() {

        const { courses, authors, actions } = this.props;

        if (courses.length === 0) {
            actions.loadCourses().catch(error => {
                alert("Data Courses is faied" + error);
            });
        }
        if (authors.length === 0) {
            actions.loadAuthors().catch(error => {
                alert("Data Author is faied" + error);
            });
        }
    }

    render() {
        return (
            <>
                <h2>Course</h2>
                <CourseList courses={this.props.courses} />
            </>
        );
    }
}

CoursePage.propTypes = {
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
            loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
        }
    };
}

function mapStateToProps(state) {
    return {
        courses: state.authors.length === 0 ? [] : state.courses.map(course => {
            return {
                ...course,
                authorName: state.authors.find(a => a.id === course.authorId).name
            };
        }),
        authors: state.authors,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);