class Project < ApplicationRecord
  # This method associates the attribute ":avatar" with a file attachment
  has_attached_file :project_photo, styles: {
   thumb: '100x100>',
   square: '200x200#',
   medium: '300x300>',
   card: '300x400>'
  }

  # Validate the attached image is image/jpg, image/png, etc
  validates_attachment_content_type :project_photo, :content_type => /\Aimage\/.*\Z/

  belongs_to :user
  has_many :rows, dependent: :destroy
  has_many :components, through: :rows, dependent: :destroy

  accepts_nested_attributes_for :rows
  accepts_nested_attributes_for :components
end
