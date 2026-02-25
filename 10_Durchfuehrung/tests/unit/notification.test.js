/**
 * Unit Tests - Notification Module
 * Tests für Benachrichtigungssystem
 */

describe('Notification Module - Notification System', () => {
    
    beforeEach(() => {
        localStorage.clear();
        if (typeof DB !== 'undefined') {
            DB.init();
        }
        // Erstelle Test User
        if (typeof UserModel !== 'undefined') {
            UserModel.create('test@example.com', 'password123', 'Test User');
            UserModel.authenticate('test@example.com', 'password123');
        }
    });
    
    // Test 1: sendNotification() - Benachrichtigung senden
    it('sollte Benachrichtigung senden können', () => {
        const user = UserModel.getCurrentUser();
        const notification_id = NotificationModel.sendNotification(
            user.id,
            'Test Benachrichtigung',
            'Das ist eine Test-Benachrichtigung'
        );
        
        expect(notification_id).toBeTruthy();
    });
    
    // Test 2: getNotifications() - Benachrichtigungen abrufen
    it('sollte Benachrichtigungen eines Users abrufen können', () => {
        const user = UserModel.getCurrentUser();
        NotificationModel.sendNotification(user.id, 'Test 1', 'Nachricht 1');
        NotificationModel.sendNotification(user.id, 'Test 2', 'Nachricht 2');
        
        const notifications = NotificationModel.getNotifications(user.id);
        
        expect(Array.isArray(notifications)).toBeTruthy();
        expect(notifications.length).toBeGreaterThan(0);
    });
    
    // Test 3: markAsRead() - Benachrichtigung als gelesen markieren
    it('sollte Benachrichtigung als gelesen markieren können', () => {
        const user = UserModel.getCurrentUser();
        const notification_id = NotificationModel.sendNotification(user.id, 'Test', 'Nachricht');
        
        NotificationModel.markAsRead(notification_id);
        
        const notifications = NotificationModel.getNotifications(user.id);
        const notification = notifications.find(n => n.id === notification_id);
        expect(notification.is_read).toBeTruthy();
    });
    
    // Test 4: markAllAsRead() - Alle als gelesen markieren
    it('sollte alle Benachrichtigungen als gelesen markieren können', () => {
        const user = UserModel.getCurrentUser();
        NotificationModel.sendNotification(user.id, 'Test 1', 'Nachricht 1');
        NotificationModel.sendNotification(user.id, 'Test 2', 'Nachricht 2');
        
        NotificationModel.markAllAsRead(user.id);
        
        const notifications = NotificationModel.getNotifications(user.id);
        const all_read = notifications.every(n => n.is_read);
        expect(all_read).toBeTruthy();
    });
    
    // Test 5: deleteNotification() - Benachrichtigung löschen
    it('sollte Benachrichtigung löschen können', () => {
        const user = UserModel.getCurrentUser();
        const notification_id = NotificationModel.sendNotification(user.id, 'Test', 'Nachricht');
        
        NotificationModel.deleteNotification(notification_id);
        
        const notifications = NotificationModel.getNotifications(user.id);
        const found = notifications.find(n => n.id === notification_id);
        expect(found).toBeUndefined();
    });
    
    // Test 6: getUnreadCount() - Ungelesene Benachrichtigungen zählen
    it('sollte Anzahl ungelesener Benachrichtigungen zählen können', () => {
        const user = UserModel.getCurrentUser();
        NotificationModel.sendNotification(user.id, 'Test 1', 'Nachricht 1');
        NotificationModel.sendNotification(user.id, 'Test 2', 'Nachricht 2');
        
        const unread_count = NotificationModel.getUnreadCount(user.id);
        
        expect(unread_count).toBe(2);
    });
    
    // Test 7: getUnreadNotifications() - Ungelesene Benachrichtigungen
    it('sollte ungelesene Benachrichtigungen abrufen können', () => {
        const user = UserModel.getCurrentUser();
        const notification_id_1 = NotificationModel.sendNotification(user.id, 'Test 1', 'Nachricht 1');
        const notification_id_2 = NotificationModel.sendNotification(user.id, 'Test 2', 'Nachricht 2');
        
        NotificationModel.markAsRead(notification_id_1);
        
        const unread = NotificationModel.getUnreadNotifications(user.id);
        
        expect(unread.length).toBe(1);
        expect(unread[0].id).toBe(notification_id_2);
    });
    
    // Test 8: clearNotifications() - Alle Benachrichtigungen löschen
    it('sollte alle Benachrichtigungen löschen können', () => {
        const user = UserModel.getCurrentUser();
        NotificationModel.sendNotification(user.id, 'Test 1', 'Nachricht 1');
        NotificationModel.sendNotification(user.id, 'Test 2', 'Nachricht 2');
        
        NotificationModel.clearNotifications(user.id);
        
        const notifications = NotificationModel.getNotifications(user.id);
        expect(notifications.length).toBe(0);
    });
    
    // Test 9: scheduleNotification() - Benachrichtigung zeitverzögert senden
    it('sollte zeitverzögerte Benachrichtigung erstellen können', () => {
        const user = UserModel.getCurrentUser();
        const future_time = new Date(Date.now() + 60000).toISOString();
        
        const notification_id = NotificationModel.scheduleNotification(
            user.id,
            'Zeitverzögert',
            'Diese ist zeitverzögert',
            future_time
        );
        
        expect(notification_id).toBeTruthy();
    });
    
    // Test 10: getNotificationByType() - Benachrichtigungen nach Typ filtern
    it('sollte Benachrichtigungen nach Typ filtern können', () => {
        const user = UserModel.getCurrentUser();
        NotificationModel.sendNotification(user.id, 'Achievement', 'Achievement Freigeschaltet', 'achievement');
        NotificationModel.sendNotification(user.id, 'Quest', 'Quest Abgeschlossen', 'quest');
        
        const achievement_notifications = NotificationModel.getNotificationByType(user.id, 'achievement');
        
        expect(Array.isArray(achievement_notifications)).toBeTruthy();
    });
    
    // Test 11: enableNotifications() - Benachrichtigungen aktivieren
    it('sollte Benachrichtigungen aktivieren können', () => {
        const user = UserModel.getCurrentUser();
        NotificationModel.disableNotifications(user.id);
        NotificationModel.enableNotifications(user.id);
        
        const settings = NotificationModel.getNotificationSettings(user.id);
        expect(settings.enabled).toBeTruthy();
    });
    
    // Test 12: disableNotifications() - Benachrichtigungen deaktivieren
    it('sollte Benachrichtigungen deaktivieren können', () => {
        const user = UserModel.getCurrentUser();
        NotificationModel.disableNotifications(user.id);
        
        const settings = NotificationModel.getNotificationSettings(user.id);
        expect(settings.enabled).toBeFalsy();
    });
    
    // Test 13: getNotificationSettings() - Benachrichtigungseinstellungen abrufen
    it('sollte Benachrichtigungseinstellungen abrufen können', () => {
        const user = UserModel.getCurrentUser();
        const settings = NotificationModel.getNotificationSettings(user.id);
        
        expect(settings).toBeTruthy();
        expect(settings).toHaveProperty('enabled');
    });
    
    // Test 14: updateNotificationSettings() - Einstellungen aktualisieren
    it('sollte Benachrichtigungseinstellungen aktualisieren können', () => {
        const user = UserModel.getCurrentUser();
        NotificationModel.updateNotificationSettings(user.id, {
            sound_enabled: false,
            email_notifications: true
        });
        
        const settings = NotificationModel.getNotificationSettings(user.id);
        expect(settings.sound_enabled).toBeFalsy();
    });
    
    // Test 15: broadcastNotification() - Benachrichtigung an alle senden
    it('sollte Benachrichtigung an alle User senden können', () => {
        NotificationModel.broadcastNotification('System', 'Wartungsmodus beginnt in 5 Minuten');
        
        const users = DB.get(DB.STORE_USERS);
        const has_notification = users.every(user => {
            const notifications = NotificationModel.getNotifications(user.id);
            return notifications.length > 0;
        });
        
        expect(has_notification).toBeTruthy();
    });
});
