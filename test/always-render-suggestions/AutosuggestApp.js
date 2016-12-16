import React, { Component } from 'react';
import sinon from 'sinon';
import Autosuggest from '../../src/AutosuggestContainer';
import languages from '../plain-list/languages';
import { escapeRegexCharacters } from '../../demo/src/components/utils/utils.js';

const getMatchingLanguages = value => {
  const escapedValue = escapeRegexCharacters(value.trim());
  const regex = new RegExp('^' + escapedValue, 'i');

  return languages.filter(language => regex.test(language.name));
};

let app = null;

export const getSuggestionValue = sinon.spy(suggestion => {
  return suggestion.name;
});

export const renderSuggestion = sinon.spy(suggestion => {
  return (
    <span>{suggestion.name}</span>
  );
});

export const onChange = sinon.spy((event, { newValue }) => {
  app.setState({
    value: newValue
  });
});

export const onSuggestionsFetchRequested = sinon.spy(({ value }) => {
  app.setState({
    suggestions: getMatchingLanguages(value)
  });
});

export const onSuggestionSelected = sinon.spy();

export default class AutosuggestApp extends Component {
  constructor() {
    super();

    app = this;

    this.state = {
      value: '',
      suggestions: getMatchingLanguages('')
    };
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      value,
      onChange
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        alwaysRenderSuggestions={true}
      />
    );
  }
}
