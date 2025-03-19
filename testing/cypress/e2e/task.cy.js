describe('task list test', { testIsolation: false }, () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173');
    });

    it('should load the task list', () => {
        cy.get('h1').should('contain', 'Nahuel - Task List');
        cy.get('.tasks__list').should('be.visible');
    });

    it('should add multiple tasks', () => {
        cy.fixture('task.json').then((tasks) => {
            tasks.forEach(task => {
                // Ingresa el título y el área de cada tarea
                cy.get('input[placeholder="Ingrese la tarea"]').type(task.title);
                cy.get('input[placeholder="Ingrese el area"]').type(task.area);
                cy.get('button[type="submit"]').click();
                cy.wait(1000); // Espera un momento entre cada tarea para asegurar que se agregue correctamente
            });

            // Recarga la página y verifica que todas las tareas se hayan agregado
            cy.reload();
            cy.wait(1000);
            tasks.forEach(task => {
                cy.get('.tasks__list')
                    .should('contain', task.title)
                    .and('contain', task.area);
            });
        });
    });

    it('should delete a task', () => {
        cy.get('.tasks__item')
            .first()
            .find('.tasks__item__remove')
            .click();
        cy.wait(1000);
        cy.reload();
        cy.get('.tasks__item').should('not.exist');
    });

    it('should toggle task completion', () => {
        cy.get('.tasks__item')
            .first()
            .find('.tasks__item__toggle')
            .click();
        cy.reload();
        cy.wait(1000);
        cy.get('.tasks__item')
            .first()
            .find('.tasks__item__toggle')
            .should('have.class', 'tasks__item__toggle--completed');
    });
});
