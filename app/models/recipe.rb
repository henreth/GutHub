class Recipe < ApplicationRecord
  belongs_to :drink
  belongs_to :ingredients
  
end
