import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Ingredients from '../../components/Ingredients';
import Instructions from '../../components/Instructions';
import Video from '../../components/Video';
import Recomendations from '../../components/Recomendations';
import ShareIcon from '../../images/shareIcon.svg';
import WhiteHeartIcon from '../../images/whiteHeartIcon.svg';
import fetchRecipe from '../../Redux/actions/fetchRecipes';

class DetailsFood extends Component {
  componentDidMount() {
    const { fetchRecipe, match } = this.props;
    const { params: { id } } = match;
    fetchRecipe(id);
  }

  render() {
    const { recipe } = this.props;
    return (
      <div>
        <div>
          {
            recipe.map(({ strMeal, strCategory, strMealThumb }) => (
              <div>
                <div>
                  <img data-testid="recipe-photo" src={ strMealThumb } alt="foto" />
                </div>
                <div>
                  <h1 data-testid="recipe-title">{ strMeal }</h1>
                  <h2 data-testid="recipe-category">{ strCategory }</h2>
                </div>
                <Ingredients />
                <Instructions />
                <Video />
                <Recomendations />
                <button
                  type="button"
                  data-testid="start-recipe-btn"
                >
                  Start recipe
                </button>
                <button type="button">
                  <img src={ ShareIcon } alt="share button" data-testid="share-btn" />
                </button>
                <button type="button">
                  <img
                    src={ WhiteHeartIcon }
                    alt="favorite button"
                    data-testid="favorite-btn"
                  />
                </button>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

DetailsFood.propTypes = {
  match: PropTypes.objectOf(PropTypes.object),
  params: PropTypes.objectOf(PropTypes.object),
  id: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  recipe: state.foods.recipes,
});

const mapDispatchToProps = (dispach) => ({
  fetchRecipe: (id) => dispach(fetchRecipe(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsFood);
