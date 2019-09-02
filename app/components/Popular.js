import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';
import Loading from './Loading';
import Card from './Card';
import Tooltip from './Tooltip';

import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle,
  FaCode
} from 'react-icons/fa';

function LanguagesNav({ selected, onUpdateLanguage }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className='flex-center'>
      {languages.map(language => (
        <li key={language}>
          <button
            className='btn-clear nav-link'
            style={language === selected ? { color: 'rgb(187,46,31)' } : null}
            onClick={() => onUpdateLanguage(language)}
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  );
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
};

function ReposGrid(repos) {
  return (
    <ul className='grid space-around'>
      {repos.map((repo, index) => {
        const {
          id,
          name,
          owner,
          html_url,
          stargazers_count,
          forks,
          open_issues
        } = repo;
        const { login, avatar_url } = owner;

        return (
          <li key={id}>
            <Card
              header={index + 1}
              name={name}
              avatar={avatar_url}
              href={html_url}
            >
              <ul className='card-list'>
                <li>
                  <Tooltip text='Github username'>
                    <FaUser color='rgb(255, 191, 116)' size={22} />
                    <a href={`https://github.com/${login}`}>{login}</a>
                  </Tooltip>
                </li>

                <li>
                  <FaStar color='rgb(255, 215, 0)' size={22} />
                  {stargazers_count.toLocaleString()} stars
                </li>
                <li>
                  <FaCodeBranch color='rgb(129, 195, 245)' size={22} />
                  {forks.toLocaleString()} forks
                </li>
                <li>
                  <FaExclamationTriangle color='rgb(241, 139, 147)' size={22} />
                  {open_issues.toLocaleString()} issues
                </li>
              </ul>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired
};

export default class Popular extends React.Component {
  state = {
    selectedLanguage: 'All',
    error: null,
    repos: {},
    loading: false
  };

  componentDidMount = () => this.updateLanguage(this.state.selectedLanguage);

  updateLanguage = selectedLanguage => {
    this.setState({
      selectedLanguage,
      error: null
    });

    if (!this.state.repos[selectedLanguage]) {
      this.setState({
        loading: true
      });
      fetchPopularRepos(selectedLanguage)
        .then(data =>
          this.setState(({ repos, loading }) => ({
            repos: {
              ...repos,
              [selectedLanguage]: data
            },
            loading: false
          }))
        )
        .catch(error => {
          console.warn('Error fetching repos: ', error);

          this.setState({
            repos: null,
            error: `There was an error fetching the repoistories.`
          });
        });
    }
  };

  // isLoading() {
  //     const { repos, selectedLanguage, error } = this.state
  //     return !repos[selectedLanguage] && error === null
  // }

  render() {
    const { selectedLanguage, repos, error, loading } = this.state;

    return (
      <React.Fragment>
        <LanguagesNav
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />

        {loading && <Loading text='Fetching Repos' />}
        {error && <p>{error}</p>}

        {repos[selectedLanguage] && (
          <pre>{ReposGrid(repos[selectedLanguage])} </pre>
        )}
      </React.Fragment>
    );
  }
}
