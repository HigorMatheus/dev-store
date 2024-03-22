describe('add product to cart', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.visit('/')
  })
  it('should be able to navigate to te product page and add it to cart', () => {
    cy.get('a[href^="/product"]').first().click()

    cy.location('pathname').should('include', '/product')

    cy.contains('Adicionar ao Carrinho').click()

    cy.contains('Cart (1)').should('exist')
  })

  it('should not count duplicated products on cart', () => {
    cy.get('a[href^="/product"]').first().click()

    cy.location('pathname').should('include', '/product')

    cy.contains('Adicionar ao Carrinho').click()
    cy.contains('Adicionar ao Carrinho').click()

    cy.contains('Cart (1)').should('exist')
  })

  it('should be able to search for a product and add it to the cart', () => {
    cy.searchByQuery('moletom')

    cy.location('pathname').should('include', '/search')

    cy.get('a[href^="/product"]').first().click()

    cy.contains('Adicionar ao Carrinho').click()

    cy.contains('Cart (1)').should('exist')
  })
})
